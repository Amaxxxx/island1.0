# island
Island是一个在线手帐制作网站.  

网站的主要功能是通过选择、编辑各种各样的贴纸和稿纸来制作手帐。由于这是我的毕设而我要在几周内完成这个网站，所以我的时间很紧张，没有时间完成很多功能。我计划在后续会增加模版功能和文字功能。尽管我感觉可以会遇到一些困难（因为我实际开始学习并练习web编程的时间还不到一年）。但是我自己已经成功完成了很多功能了，这些功能背后的逻辑都差不多，所以我觉得我能完成它。（其实这是我第一个全栈项目，能做到这样我觉得不算太烂）

不管怎么样，大家最关心我到底实现出来了什么？怎么使用？所以我们先来看看如何使用这个网站，如果你对启动我的整个网站感兴趣，可以看看后续我写的启动方法。



Island is an online scrapbook-making website.


it helps you make your scrapbook with different papers and pastes.Since it's my graduation design and i have to make this website in a few weeks, i don't have enough time to make more functions. I also plan to add text function and templates function in the future. Although it's not an easy thing for me(a student who only learn to practice web-programming less than one year). But I successfully finished some functions by myself, and the logic of the new functions is quite similar with my old ones, so i think i can do it.

Anyway, I think I should introduce the functions first. Then,i'll introduce how to use it in your own computer.

# Signup and Login(登陆注册)
和大多数网站一样，你要先注册再登陆。非常好理解，可以看下面的gif图

Same as other websites, you should signup first and then login with your username and password. It's easy to understand so you can just look at the gifs below.

![signup login](https://user-images.githubusercontent.com/52597269/224017960-8434ff0a-03db-410d-9a00-df15b8897452.gif)

# create a new scrapbook(新建手帐本)
新建手帐本的第一步就是点击新建，然后输入手帐本的基本信息，如名称，然后选择一个封面作为手帐本的展示封面。

the first step to create your scrapbook is pressing "create" and entering the basic information about your scrapbook such as your scrapbookname, and then you must choose a cover of your book.

![createscrapbook](https://user-images.githubusercontent.com/52597269/224020210-2c4c165d-5185-4580-a173-fcb8116ce87d.gif)

# editing and managing scrapbook(编辑和管理手帐本)
如果你想修改手帐本信息，你随时可以修改。同时，你也可以按照创建时间排序你的所有手帐本。如果你想要删除手帐本，你也可以点击“管理”-“删除“，选择手帐本然后删除它。

If you are unsatisfied of the basic information, don't worry. you can edit it again. If you create too many scrapbook, you can also sort them by their create time. If you don't like one of the scrapbooks, you can also delete it.


![manage delete sort](https://user-images.githubusercontent.com/52597269/224026574-50c3150e-e08f-46b4-b0ad-6b10f1178c16.gif)

# add,delete papers(编辑和管理手帐本)

在添加贴纸之前，至少要加一张纸。你可以选择纸张的样式。如果你想删除，也可以选择你想删除页的页码然后点击“确定”删除。如果你觉得纸张的页面太大/太小，你也可以点击左上角的放大镜放大或缩小。

before adding pastes to your scrapbook, you must add one paper first. you can choose the style of you paper.and you can delete it by choosing the page. if you think your paper is too small/big for you, you can adjust it by click the magnifying glass on the top left corner.


![addpaper](https://user-images.githubusercontent.com/52597269/224030702-dc665d52-86fd-4088-a761-8a9656daff90.gif)

# add,edit pastes(添加、编辑贴纸)
终于到了贴纸的部分。选择一个喜欢的贴纸，你可以缩放，旋转或拖拽。不要忘了保存！不然在切换页面和退出时默认不保存。你也可以删除不喜欢的贴纸或者编辑它的透明度或饱和度。

finally,we come to the most interesting part of our website.you can add paste to your scrapbook.choose one of the pastes.you can scale it,rotate it or drag it. Dont't Forget to Save it!!, or you will lose all of the pastes after you changed the page or quit.


![paste1](https://user-images.githubusercontent.com/52597269/224034014-343345fa-b104-4a13-9f52-3d7d018016cd.gif)

you can also delete or edit the paste

![paste2](https://user-images.githubusercontent.com/52597269/224034902-bfcd2ec6-703e-4908-b803-1758ff4370e2.gif)

# other functions(其他功能)
你可以在首页看到你在islan度过的时间。如果你想听音乐，我也做了一个小的音乐推荐列表。是txt的新专辑temptation。哈哈，我是他们的粉丝，一个小moa

you can see how much time you have been use ISLAND in index. and if you like to listen to some music, i also list some recommand songs. They are the new album of TXT(tomorrow by together), the Temptation. ahhh, i am moa.


# how to run the project(如何启动网站)
启动网站很简单。先将项目克隆到你的电脑上。然后连接好mongodb数据库。最后在你的编辑器里输入"npm start"就可以启动啦。

the way to run my project is easy. first clone it to your computer, then you must connect mongodb to the project.and the final thing is to enter "npm start" in your ide, then you will see the guest page.


# i need your suggest!(欢迎提出bug或进行指正！)
