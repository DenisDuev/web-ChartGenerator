# web-ChartGenerator
An university project for Web Technologies, X edition, 2018.
Sofia University, Faculty of Mathematics and Informatics

# Task:
## Генератор на диаграми по зададени файлове 
(например: https://support.office.com/bg-bg/article/Налични-типове-диаграми-10b5a769-100d-4e41-9b0f-20df0544a683#__toc365991018) - ъплоудват се файлове, задават се параметри (в нещо като wizard), които генерират една или повече заявки, дава се възможност да се редактира заявката и след това чертае избран тип диаграма (например среден успех на студенти от първите 5 домашни по www)

# How to setup
- start mysql database
- at the beginning of *server.js* edit db settings
- start the applicatiom using node js (either your or node.exe file) -> *node server.js*
### setup db:
- you can import **mydb.sql** file or 
- stop server, start it again (when the server is started, it created new db and then creates tables, you only need to restart the connection)

Now you only need to register in the application or use admin/admin

## Special

You can use the app without registration. How to do that?
- in filesystem place desired files under *files_secret* folder
- call <host>:<post>/secret.html/type={type}&file={file.extension}
and you can make the desired diagram without login

possible types are: line, bar, pie, doughnut

This project uses [ChartJS](https://www.chartjs.org/)

![chatjs.logo](https://www.chartjs.org/img/chartjs-logo.svg)