url="https://dic.daum.net/search.do?q=$1"
curl -s "$url" | grep data-audio > .raw.txt
awk -f data-audio.script .raw.txt > .audio.txt
awk -f data-url.script .audio.txt > .url.txt

mp3=$(cat .url.txt)
curl -so "$1.mp3" "$mp3"
