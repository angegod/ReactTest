import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function SearchProduct(){

    /* declare variable here*/
    //const [post,setPost]=useState({});
    //const [id,setId]=useState();
    const [idFromButtonClick,setIdFromButtonClick]=useState(false);
    const [records,setRecords]=useState([]);//從API抓下來的紀錄
    const [showRecords,setShowRecords]=useState([]);//實際上會顯示出來的紀錄。會做分類
    const [check,setCheck]=useState(false);
    const [pages,setPages]=useState(1);//設定頁碼  
    const [MaxPages,setMaxPages]=useState(1);
    //const [cart,setCart]=useState([]);

    const handleclick=()=>{
        setIdFromButtonClick(true);
    }


    useEffect(()=>{
        if(idFromButtonClick){
            axios.get(`https://localhost:44345/api/Product/`)
            .then(res=>{
                if(res.data!==""){//如果有找到資料
                    setCheck(true);
                    setPages(1);
                    setRecords(JSON.parse(res.data));
                    //console.log(records); 
                }else{
                    setCheck(false);
                }
            }).catch(err=>{
                console.log(err);
            })
        }
        let pagesMaxNumber= Math.ceil(records.length/5);//最大頁碼
        //console.log(records.length);
        setMaxPages(pagesMaxNumber);
        setIdFromButtonClick(false);
        var array=[];
        for(var i=1;i<=MaxPages;i++){
            array[i-1]=[];
            for(var j=0;j<=4;j++){
                var num=5*(i-1)+j;//
                //console.log(num+":"+MaxPages);
                if(records.length<(num+1))
                    break;
                else{
                    array[i-1][j]=records[num];
                }
               
                
            } 
        }
        
        setShowRecords(array);
       
    },[idFromButtonClick,records,MaxPages])

    function Result(){//呼叫搜尋結果
        if(check){//如果有找到相關結果
            return (<><FindSearch/><PagesButton/></>);
        }
        else{//反之
            return <MissSearch/>;
        }
    }

    function MissSearch(){
        return <h2>No result Found</h2>;
    }
    
    function FindSearch(){
        //透過目前所在頁碼數，來顯示資料
        if(showRecords[pages-1]===undefined){
            showRecords[pages-1]=[];
        }
        const list=showRecords[pages-1].map((data,i)=>
            <tr key={i}>
                <td className='id'>{data.id}</td>
                <td className='name'>{data.name}</td>
                <td className='price'>{data.price}</td>
                <td className='details'><Button variant='btn btn-primary'>詳情</Button></td>
            </tr>);
        

        return(<table style={{listStyle:'none',marginLeft:'auto',marginRight:'auto'}}>
                <thead>
                    <tr style={{color:'brown',fontWeight:'bold'}}>
                        <td>編號</td>
                        <td>名稱</td>
                        <td>價格</td>
                        <td style={{background:'white'}}></td>
                    </tr>
                </thead>
                <tbody>
                {list}
                </tbody>
                
               </table>);
       
    }


    
    function PagesButton(){
        return(<div className='buttons'>
                <Button onClick={()=>pagesCount(-1)} className='btn btn-warning'>上一頁</Button>
                <label>{pages}</label>
                <Button onClick={()=>pagesCount(1)} className='btn btn-warning'>下一頁</Button>
                </div>
        );
    }

    function pagesCount(num){
        let pagesMaxNumber=MaxPages;
        
        if((pages===1&&num===1)||(pages===pagesMaxNumber&&num===-1))
            setPages(count=>count+=num);
        else if(pages>1&&pages<pagesMaxNumber)
            setPages(count=>count+=num)
            
    }
   
    return(
        <div>
            <h1>商品專區</h1>
            <Button type="button" onClick={handleclick} variant="primary">Search</Button>
            <div className='result'>{<Result/>}</div>
            <a href='https://www.google.com.tw/'>網址</a>
            
            <hr/>
            {/*<div className='browse'>
                <ul style={{listStyle:'none'}}>
                    {records.map((record,i)=><li key={i}>{record}</li>)}
                </ul>
            </div>*/}
            
            {/*<ul>
                {
                    posts.map(post=><li key={post.id}>{post.title}</li>)
                }
            </ul>*/}
        </div>
    )
}

export default SearchProduct;