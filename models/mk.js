
const request = require('request');
const fs = require('fs');
const xml2js = require('xml2js');
const iconv = require('iconv-lite');
const charset = require('charset');
const parseString = xml2js.parseString;
const date = new Date();
module.exports = ()=>{
    let arr = {};   
    let arr2 = {};
    request.get( {
        uri: 'http://file.mk.co.kr/news/rss/rss_50200011.xml',
        encoding: null
    }, (err,res,body)=>{
        if(err){
            return console.error(err);
        }
        const enc = charset(res.headers, body) // 해당 사이트의 charset값을 획득
		const i_result = iconv.decode(body, enc) // 획득한 charset값으로 body를 디코딩
		parseString(i_result, {trim:true} ,(err,result)=>{
            if(err){
                console.error(err);
            }else{
                // console.log(JSON.stringify(result,null,4));
            }
            arr = result.rss.channel[0].item;
        });
        // console.log(arr);
        arr2 = arr.map((item,index)=>(
`
${index+1} 제목 : ${item.title}  
요약: ${item.description}`
        ));
                
        // console.log(arr2);
        fs.writeFile(`./${date.getMonth()+1}월${date.getDate()}일매경.txt`, arr2, 'utf8',function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        });  
    });
            
}