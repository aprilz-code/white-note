#/bin/bash
#environment variable
source /etc/profile
#cpu
cpu_us=`vmstat | awk '{print $13}' | sed -n '$p'`
cpu_sy=`vmstat | awk '{print $14}' | sed -n '$p'`
cpu_id=`vmstat | awk '{print $15}' | sed -n '$p'`
cpu_sum=$(($cpu_us+$cpu_sy))
echo $cpu_sum
