import './articleStyle.css';

export default function Recommendation (){
    const article = {
        title: '你叉叉',
        description: '什么是快乐星球什么是快乐星球如果你想知道什么是快乐星球的话我现在就带你研究',
        articleImg: './component/Image/background.jpg',
        author: 'First Linda',
        pubDate: '12/03/2021'
    }
    const article2 = {
        title: '穷哈哈',
        description: '传说有个魔仙堡,有个女王不得了,每个魔仙得她指导,都盼望世界更美好. 变大变小真的奇妙,一个咒语一个符号，一不小心就会一团糟，我有个好提议就约定在一起去寻找魔法的秘密一看到巧克力特别是草莓的我知道我无能为力巴啦啦小魔仙咒语一呼喊就展开正义的一战巴啦啦小魔仙咒语一呼喊会实现最美的梦想有了友爱力量我的法力变强战胜灰暗忧伤我们才能够成长小魔仙来到人间一整天帮助别人不空闲小魔仙不怕危险',
        articleImg: './component/Image/background.jpg',
        author: 'Second Linda',
        pubDate: '12/03/2021'
    }
    return (
        <div className='recommendations'>
            <div className='recommendationContainer'>
                <h1>{article.title}</h1>
                <p> {article.description}
                <br/><br/>{article.author}<br/>{article.pubDate}</p>    
            </div>
            <div className='recommendationContainer'>
                <h1>{article.title}</h1>
                <p> {article2.description}
                <br/><br/>{article.author}<br/>{article.pubDate}</p>    
            </div>
        </div>
    )
}