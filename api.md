1、创建一个数据库
2、使用 `npx sequelize init` 初始化
3、使用 `npx sequelize model:generate --name 表名 --attributes name:string,status:tinyint,time:date`生成模型文件 model,migration
4、使用 `npx sequelize db:migrate`持久化数据表(在数据库里面创建表)

## 以上`sequelize`也可以用`sequelize-cli`

# 商品表:goods

创表语句:`npx sequelize model:generate --name goods --attributes title:string,status:tinyint,cate_id:integer,promotion:string,unit:string,keyword:string,sub_title:string,stock:integer,price:decimal,cost_price:decimal,sku_id:integer,is_show_stock:tinyint,goods_specs_type:tinyint,main_image:string,description:text,big_image:string,is_index_recommend:tinyint,sort:integer`

# 商品分类表:categoyies

创表语句:`npx sequelize model:generate --name categoy --attributes name:string,status:tinyint,parent_id:integer,sort:integer`

# 规格表:goods_spec

创表语句:`npx sequelize model:generate --name goods_spec --attributes name:string,status:tinyint`

# 商品规格属性表: goods_spec_value

创表语句:`npx sequelize model:generate --name goods_spec_value --attributes name:string,status:tinyint,spec_id:integer`

# 商品 SKU 表 goods_sku

创表语句:`npx sequelize model:generate --name goods_sku --attributes goods_id:integer,status:tinyint,price:decimal,spec_value_ids:string,cost_price:decimal,stock:integer`

# 管理员表 users

创表语句:`npx sequelize model:generate --name user --attributes name:string,password:string,status:tinyint`

# 购物车表 shopping_cart

创表语句:`npx sequelize model:generate --name shopping_cart --attributes goods_id:integer,member_id:integer`

# 用户表 members

创表语句:`npx sequelize model:generate --name member --attributes first_name:string,last_name:string,password:string,email:string,phone:string,default_address_id:integer`

# 用户表地址表 address

创表语句:`npx sequelize model:generate --name address --attributes first_name:string,last_name:string,email:string,phone:string,country_id:integer,street_address:string,city:string,postal_code:string,is_default:tinyint,status:tinyint`

# 订单表 orders

创表语句:`npx sequelize model:generate --name orders --attributes member_id:integer,first_name:string,last_name:string,email:string,phone:string,country_id:integer,street_address:string,city:string,postal_code:string,status:tinyint,skus:text`

# 付款方式

创表语句:`npx sequelize model:generate --name payment_methods --attributes name:string,status:tinyint,sort:tinyint`

# 品牌

创表语句:`npx sequelize model:generate --name brands --attributes name:string,status:tinyint,sort:tinyint,goods_numbers:number`
