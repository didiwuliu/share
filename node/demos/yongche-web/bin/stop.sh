info=`ps -ef|grep 'development'|grep -v grep|awk '{print $2}'`
for pid in $info
do
	kill $pid
done
