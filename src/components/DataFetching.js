import React,{useState,useEffect} from 'react';
import axios from 'axios';

function DataFetching(){

    /* declare variable here*/
    const [post,setPost]=useState({});
    const [id,setId]=useState();
    const [idFromButtonClick,setIdFromButtonClick]=useState();
    const [records,setRecords]=useState([]);
    const [check,setCheck]=useState(false);    

    const handleclick=()=>{
        setIdFromButtonClick(id);
    }

   
    //https://jsonplaceholder.typicode.com/posts/${idFromButtonClick}
    //https://localhost:44345/api/Values/${idFromButtonClick}
    useEffect(()=>{
        axios.get(`https://localhost:44345/api/Values/?searchid=${idFromButtonClick}`)
            .then(res=>{
                if(res.data!==""){//如果有找到資料
                    setCheck(true);
                    console.log(res.data);
                    setPost(JSON.parse(res.data));//將JSON字串序列化
                    setRecords(oldarray=>[...oldarray,JSON.parse(res.data).name]);
                }else{
                    setCheck(false);
                }
            }).catch(err=>{
                console.log(err);
            })
    },[idFromButtonClick])

    function Result(){//呼叫搜尋結果
        if(check){//如果有找到相關結果
            return <FindSearch/>;
        }
        else{//反之
            return <MissSearch/>;
        }
    }

    function MissSearch(){
        return <h2>No result Found</h2>;
    }
    
    function FindSearch(){
        return <div>{post.identity}</div>
    }

   
    return(
        <div>
            <input type="text" value={id} onChange={e=>setId(e.target.value)} />
            <button type="button" onClick={handleclick} class="primary">Search</button>
            <div>{<Result/>}</div>
            <hr/>
            <div className='browse'>
                <ul style={{listStyle:'none'}}>
                    {records.map((record,i)=><li key={i}>{record}</li>)}
                </ul>
            </div>
            
            {/*<ul>
                {
                    posts.map(post=><li key={post.id}>{post.title}</li>)
                }
            </ul>*/}
        </div>
    )
}



export default DataFetching;