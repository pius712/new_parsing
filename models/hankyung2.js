const request = require('request');
const fs = require('fs');
const parseString = require('xml2js').parseString;
const date = new Date();
module.exports = ()=>{
    let arr = {};   
    let arr2 = {};
    request.get('http://rss.hankyung.com/new/news_stock.xml', (err,res,body)=>{
        if(err){
            return console.error(err);
        }
        
        parseString(body, {trim:true} ,(err,result)=>{
            if(err){
                console.error(err);
            }
            arr = result.rss.channel[0].item;
        });
        arr2 = arr.map((item,index)=>(
`
${index+1} 제목 : ${item.title}  
요약: ${item.description}`
        ));
                
        // console.log(arr2);
        fs.writeFile(`./${date.getMonth()+1}월${date.getDate()}일한경2.txt`, arr2, 'utf8',function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        });  
    });
            
}