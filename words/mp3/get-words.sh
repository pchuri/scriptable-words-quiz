f=$1
words=$(awk -f words.script $f)
i=1
for w in $words
do
 echo $w
 sh get-audio.sh $w
 if [ $i -lt 10 ]
 then 
  mv $w.mp3 "0$i-$w.mp3"
 else
  mv $w.mp3 "$i-$w.mp3"
 fi
 
 i=$((i+1))
done 
