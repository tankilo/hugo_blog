const fs = require("fs");
const { promisify } = require("util");
const moment = require("moment-timezone");
const matter = require("gray-matter");
const mkdirp = require("mkdirp-promise");

const timezone = "Asia/Shanghai";
const src = "hexo";
const target = "hugo";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const log = console.log.bind(console);
const indent = "   ";

function read(name) {
  const path = `${src}/${name}`;
  const opts = { encoding: "utf8" };
  return readFile(path, opts).then(text => ({ name, text }));
}

function write(file) {
  const path = `${target}/${file.name}`;
  return mkdirp(target).then(_ => writeFile(path, file.text));
}

function check(file) {
  file.text = file.text.trim();
  if (!/^-{3}\s*\n/.test(file.text)) {
    file.text = `---\n${file.text}`;
  }
  if (!matter.test(file.text)) {
    log("Ops,something wrong in file:", file.name);
    return false;
  }
  return true;
}

function convert(file) {
  log("Starting to convert file", file.name);

  const { data, content } = matter(file.text);

  // title
  if (!data.title)
    data.title = file.name
      .replace(/\.md$/, "")
      .replace(/-/g, " ")
      .replace(/\b[a-z]/g, m => m.toUpperCase());

  log(indent, "[title]", data.title);

  // date
  data.date = moment
    .tz(data.date ? new Date(data.date) : new Date(), timezone)
    .format();

  log(indent, "[date]", data.date);

  // categories
  if (data.categories) {
    if (!Array.isArray(data.categories)) {
      data.categories = [data.categories];
    }
    log(indent, "[categories]", data.categories);
  }

  //tags
  if (data.tags) {
    if (!Array.isArray(data.tags)) data.tags = [data.tags];
    log(indent, "[tags]", data.tags);
  }
  file.text = matter.stringify(content, data);

  log("Done\n");

  return file;
}

function __main__() {
  readdir(src)
    .then(names => names.filter(name => /\.md$/.test(name)))
    .then(names => Promise.all(names.map(read)))
    .then(files => files.filter(check))
    .then(files => files.map(convert))
    .then(files => Promise.all(files.map(write)))
    .then(files => log(`Converted ${files.length} files`))
    .catch(console.error);
}

__main__();
