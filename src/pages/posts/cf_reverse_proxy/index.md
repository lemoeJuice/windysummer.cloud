# 使用cloudflare隧道实现反向代理
---
>先前搭建个人主页的过程中，遇到了80/443端口被屏蔽的问题，备案又太麻烦。恰好网站的域名托管在cloudflare，想到了之前使用了cf的隧道进行端口映射，使用同样的方法可以绕过这个问题。

>这个方法同样适用于没有公网ip但是想要在公网暴露服务的情况，但在国内环境延迟略高。

>2025/3/11
---
想要使用此方法，首先需要有一个域名。有了一个域名之后可以在前面进行子域名的扩展。

可以被他人访问的网站实际上是一个开放在80（http）/443（https）端口的服务，因此这样的方法对于网页或服务的代理是通用的。

不同于直接在dns解析直接添加记录，使用隧道需要先在服务器安装cloudflared，cf将通过它来访问服务，而非通过公网端口访问，避免了被机房阻断的问题。因此也只需要将服务暴露在本地即可，这样服务与外界的通信都将通过和cf的加密连接进行。
