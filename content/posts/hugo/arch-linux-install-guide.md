---
title: ArchLinux安装备忘
tags:
  - Linux
  - 配置
  - ArchLinux
  - i3
categories:
  - Linux
date: '2017-11-03T07:42:33+08:00'
---

写这个的原因。。怎么说。。踩了很多坑。。

<!--more-->

现在是这样的

![捕获.PNG](https://i.loli.net/2017/11/03/59fbe1b4d67f8.png)

当然是跑在虚拟机上（万一跑在实体机上哪天倒地不起怎么办）

其实官方Wiki已经相当详细了，这里搞这个东西是为了让自己能快速装上。。

```bash
internet:
    dhcpcd
    wifi-menu

time:
    timedatectl set-ntp true
    fdisk -l
    fdisk /dev/sda

mount:
    mount /dev/sda2 /mnt
    mkdir /mnt/home
    mount /dev/sda1 /mnt/home  # Your Home


vim /etc/pacman.d/mirrorlist
pacstrap /mnt base base-devel

genfstab -L /mnt  /mnt/etc/fstab
cat /mnt/etc/fstab

arch-chroot /mnt

ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc

pacman -S vim dialog wpa_supplicant ntfs-3g
--------------------------------------------------------------
# change loacle information
vim /etc/locale.gen   # set CN, HK, TW, US
locale-gen
vim /etc/locale.conf  # add to last "LANG=en_US.UTF-8"
--------------------------------------------------------------
# change host name
vim /etc/hostname   # hostname
vim /etc/hosts 

# 127.0.0.1	localhost.localdomain	localhost
# ::1		localhost.localdomain	localhost
# 127.0.1.1	myhostname.localdomain	myhostname

passwd
--------------------------------------------------------------
# install grub
pacman -S intel-ucode os-prober grub
grub-install --target=i386-pc /dev/sdx
grub-mkconfig -o /boot/grub/grub.cfg
#  if there is "warning failed to connect to lvmetad，falling back to device scanning"
#  vim /etc/lvm/lvm.cong    set  "use_lvmetad = 0"
vim /boot/grub/grub.cfg
# check if grub is well configed
cd /boot
ls
--------------------------------------------------------------
exit
reboot
# WELCOME TO ARCH!
--------------------------------------------------------------
# clone Archi3
sudo pacman -S git
git clone http://github.com/erikdubois/archi3
--------------------------------------------------------------
# add sudo
useradd -m -G wheel [username]
passwd [username]

pacman -S sudo

visudo
# %wheel ALL=(ALL)ALL = %wheel ALL=(ALL)ALL
# just remove the '#'
reboot

--------------------------------------------------------------
# run Archi3's autoinstall
--------------------------------------------------------------
# Vim configs
cd ~
wget http://git.margatroid.xyz/Margatroid/vimrc/raw/master/.vimrc
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
# run vim, then run ":PluginInstall"
--------------------------------------------------------------
# i3 configs
git clone https://github.com/tobi-wan-kenobi/bumblebee-status ~/.config/i3
# then add config to i3's config
--------------------------------------------------------------
# install CN fonts
sudo pacman -S adobe-source-hans <Tab
# install useful softwares
sudo pacman -S gcc clang cmake gdb chromium python python-pip
--------------------------------------------------------------
# add AUR & archlinux cn
# just add theses mirrors to your /etc/pacman.conf
```

modified from kZime's install guide
