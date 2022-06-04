# VirtualMachineMonitoringSystemFrontend
使用Vue3搭建的虚拟机数据监控前端Web页面

#### 小组成员

| 小组成员 | 学号    |
| -------- | ------- |
| 李航宇   | 1913092 |
| 高鹏     | 1913073 |
| 马宁     | 1913780 |
| 郭书奇   | 1812985 |

#### 部署方式

>本项目已经构建成Docker镜像上传至Docker Hub，可以在安装了Docker服务的Linux机器上执行以下命令，启动前端服务(必要时可以登录Docker Hub查看lhy211/virtualmachinemonitoringsystemfrontend镜像的最新版本)

```shell
sudo docker pull lhy211/virtualmachinemonitoringsystemfrontend:782453cf1cebdc34cbc97e84af232a0ab29cea85
sudo docker run -d -p 80:80 \
lhy211/virtualmachinemonitoringsystemfrontend:782453cf1cebdc34cbc97e84af232a0ab29cea85
```

也可以手动构建Docker镜像运行

```shell
git clone git@github.com:SoftwareTestFinalHomework/VirtualMachineMonitoringSystemFrontend.git
cd VirtualMachineMonitoringSystemFrontend
sudo docker build . -t virtualmachinemonitoringsystemfrontend:v1.0
sudo docker run -d -p 80:80 virtualmachinemonitoringsystemfrontend:v1.0
```

#### 前端运行效果

##### 添加服务器界面

<img src="./document/88f30129c446c34c279dba4b5dd706b.png" alt="88f30129c446c34c279dba4b5dd706b"  />

##### 服务器连接检查

<img src="./document/d822a1665de90414d0003667d17f108.png" alt="d822a1665de90414d0003667d17f108"  />

##### 服务器添加

<img src="./document/a05a10d94e5c5444d8773274bfbe1a0.png" alt="a05a10d94e5c5444d8773274bfbe1a0"  />

##### 虚拟机页面实时监控(每五秒获取数据一次)

![235676f3000727d8711c7a999cc7002](./document/235676f3000727d8711c7a999cc7002.png)

##### 虚拟机历史数据展示(Influx DB中的间隔30分钟的所有数据)

![0691f8338995a84a378c141602b02fa](./document/0691f8338995a84a378c141602b02fa.png)

![714b5c4d0d545081cba0d963c3b6419](./document/714b5c4d0d545081cba0d963c3b6419.png)

![6e9e78e6e3ac4e2223e3d3721cb74ec](./document/6e9e78e6e3ac4e2223e3d3721cb74ec.png)

![c54e22edd8f5a92e7125afb84b407bc](./document/c54e22edd8f5a92e7125afb84b407bc.png)

##### 服务器与虚拟机的列表关系展示

![2b2d6f12883190a25e97dc6e9dc3300](./document/2b2d6f12883190a25e97dc6e9dc3300.png)

##### 服务器删除

![6f3ceeefa8275d599cd689acb8b5ccb](./document/6f3ceeefa8275d599cd689acb8b5ccb.png)

![ad9c865774692b45d70a99145d9cc47](./document/ad9c865774692b45d70a99145d9cc47.png)



##### 虚拟机创建界面

![9f66b2841e078003e55a18ef2331af3](./document/9f66b2841e078003e55a18ef2331af3.png)

![dc38a20ae9c9724e73ba7c9b0efa402](./document/dc38a20ae9c9724e73ba7c9b0efa402.png)

##### 虚拟机删除界面

![7812b2c386eaa45b4a13095177cb204](./document/7812b2c386eaa45b4a13095177cb204.png)
