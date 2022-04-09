-- 用户表
create table if not exists im_user (
	uid int(6) auto_increment primary key,
	uname varchar(20) not null COMMENT '用户名',
	gender char(1) COMMENT '性别',
	birth varchar(10) COMMENT '出生年月日 yyyy-mm-dd',
	region varchar(100) COMMENT '地区',
	words varchar(250) COMMENT '签名'
)

-- 好友表
create table if not exists im_relation (
	uid_owner int not null COMMENT '主人 uid',
	uid_friend int not null COMMENT '朋友 uid',
	primary key(uid_owner, uid_friend)
)

-- 消息表
create table if not exists im_message (
	msg_id int(20) not null auto_increment primary key,
	sender_uid int not null COMMENT '发送者 uid',
	receiver_uid int not null COMMENT '接收者 uid',
	content text not null COMMENT '消息内容',
	send_time timestamp default now() COMMENT '发送时间',
	accepted bool default false COMMENT '是否接收',
	accepted_time timestamp COMMENT '接收时间'
)

insert into im_user (uname, gender, birth, region, words) values
('jack', '1', '1989-01-01', 'US', 'day day up!'),
('rose', '0', '1989-01-01', 'US', 'day day up!');

insert into im_relation (uid_owner, uid_friend) values
(2, 3);

insert into im_message (sender_uid, receiver_uid, content, send_time) values
(1, 2, 'hello from OurChat', now());

-- 查询一个用户的所有好友 id
select
	distinct
	case
		when uid_owner = 2 then uid_friend
		when uid_friend = 2 then uid_owner
	end 'friends'
from
	im_relation ir
where
	uid_owner = 2
	or uid_friend = 2

-- 查询两个用户的共同好友 id
select
	a.friends
from
	(
	select
		distinct
		case
			when uid_owner = 2 then uid_friend
			when uid_friend = 2 then uid_owner
		end 'friends'
	from
		im_relation ir
	where
		uid_owner = 2
		or uid_friend = 2
) a
inner join
(
	select
		distinct
		case
			when uid_owner = 1 then uid_friend
			when uid_friend = 1 then uid_owner
		end 'friends'
	from
		im_relation ir
	where
		uid_owner = 1
		or uid_friend = 1
) b on
	a.friends = b.friends

-- 查询两个用户共同好友的信息
select
	*
from
	im_user
where
	uid in (
	select
		a.friends
	from
		(
		select
			distinct
			case
				when uid_owner = 2 then uid_friend
				when uid_friend = 2 then uid_owner
			end 'friends'
		from
			im_relation ir
		where
			uid_owner = 2
			or uid_friend = 2
) a
	inner join
(
		select
			distinct
			case
				when uid_owner = 1 then uid_friend
				when uid_friend = 1 then uid_owner
			end 'friends'
		from
			im_relation ir
		where
			uid_owner = 1
			or uid_friend = 1
) b on
		a.friends = b.friends
)










