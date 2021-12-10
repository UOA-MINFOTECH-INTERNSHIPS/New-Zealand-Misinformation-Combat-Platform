import './articleStyle.css';
import { Tooltip , IconButton} from "@mui/material";

export default function articleContainer (props){
    const article = {
        title: 'Article1',
        description: '什么是快乐星球什么是快乐星球如果你想知道什么是快乐星球的话我现在就带你研究',
        articleImg: './component/Image/background.jpg',
        author: 'First Linda',
        pubDate: '12/03/2021'
    }
    const article2 = {
        title: 'Article2',
        description: '传说有个魔仙堡,有个女王不得了,每个魔仙得她指导,都盼望世界更美好. 变大变小真的奇妙,一个咒语一个符号，一不小心就会一团糟，我有个好提议就约定在一起去寻找魔法的秘密一看到巧克力特别是草莓的我知道我无能为力巴啦啦小魔仙咒语一呼喊就展开正义的一战巴啦啦小魔仙咒语一呼喊会实现最美的梦想有了友爱力量我的法力变强战胜灰暗忧伤我们才能够成长小魔仙来到人间一整天帮助别人不空闲小魔仙不怕危险',
        articleImg: './component/Image/background.jpg',
        author: 'Second Linda',
        pubDate: '12/03/2021'
    }
    return (
        <div>
            <div className='UserContainer'>
                <div>
                    <img style={{margin:"10px", width:"200px", height:"200px"}} 
                        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
                    />
                </div>
                <div>
                    <h1>{article.title}</h1>
                    <p> {article.description}
                    <br/><br/>{article.author}<br/>{article.pubDate}</p>    
                </div>
            </div>
            <div className='UserContainer'>
                <div>
                    <img style={{margin:"10px", width:"200px", height:"200px"}} 
                        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
                    />
                </div>
                <div>
                    <h1>{article.title}</h1>
                    <p> {article2.description}
                    <br/><br/>{article.author}<br/>{article.pubDate}</p>    
                </div>
            </div>
        </div>
    )
}