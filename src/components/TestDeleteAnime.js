import React,{useState,useEffect} from 'react';
//import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/Anime.css';


const TestDeleteAnime=()=>{
    const [array1,setarray1]=useState(["蘋果","香蕉","鳳梨","藍莓","芒果","西瓜","柳橙"]);
    const [InputItem,setInputItem]=useState('');
    

    useEffect(()=>{
        //setarray1(oldarray=>[["蘋果",true],["香蕉",true],["鳳梨",true],["藍莓",true],["芒果",true],["西瓜",true],["柳橙",true]]);
    },[])

    const itemList=array1.map((item,i)=>{
        var listId='item'+i;
        
        return(
            <li key={i} id={listId} style={{fontSize:'30px'}}>{item}<Button onClick={()=>DeleteItem(i)} variant='danger'>下架</Button></li>
        )
    });

    function DeleteItem(num){
        //先css淡出
        var oldarray=array1;        
        var searchId=`item${num}`;
        
        var specLi=document.getElementById(searchId);
        specLi.classList.add('drop');

        //再刪除
        //var index=0;
        
        //console.log(num);

        const delay = ms => new Promise(
            resolve => setTimeout(resolve, ms)
        );

        delay(2000);
        //console.log(oldarray);
        setarray1((current) =>
            current.filter((fruit,i) => i !== num)
        );
        //console.log(oldarray);

        

    }



    return(
        <>
            <div className='container'>
                <div className='input'>
                    <input type='text' onChange={e=>setInputItem(e.target.value)}/>
                    <Button variant='primary'>添加</Button>
                </div>
                <hr/>
                <ul>
                    {itemList}
                </ul>
                
            </div>
        </>
    )
}

export default TestDeleteAnime;