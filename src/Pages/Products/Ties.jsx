import Card from "../../Components/Moleculas/Card/Card";
import Footer from "../../Components/Organismos/Footer/Footer";
/* Vista de Corbatas */

import Header from "../../Components/Organismos/Header/Header";
import Navar from "../../Components/Organismos/Navar/Navar";

const Ties = () =>{
  const userName = "Cerrar Sesion";
    return(
      <div>
           <Header userName={userName}></Header>
           <Navar></Navar>

           <Card
                src="https://scontent.ftgz1-2.fna.fbcdn.net/v/t39.30808-6/321438506_492847649582170_317694879027163817_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEj_IrUqXhPceFYfOCAMJ4Yjy-ypdv8hxKPL7Kl2_yHEsUDyarJCxmvn_AzUhj2behGhO5TTANM5aLmIOa34I4s&_nc_ohc=anGWybZZNTwQ7kNvgHQ0FWr&_nc_ht=scontent.ftgz1-2.fna&gid=ADjAP83O9wgOOAKVuCOuvpZ&oh=00_AYARJYF9BfxQX4c3g2ZF2yw-jfBeO4nYOGNuAfLLaEEvNw&oe=668C1343"
                name="Saco Casual"
                precio="789"
            ></Card>
            <Card
                src="https://scontent.ftgz1-1.fna.fbcdn.net/v/t39.30808-6/310011812_622099876636824_8813029468447785589_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEkZ-gh78AaQsq19QoQJEY834nOgmoqU_jfic6CaipT-GHqEcRlADqC4yfuFg6MaL-fzs0iixQfwcP4dP0I8nbD&_nc_ohc=DfzNgRMP-DMQ7kNvgGR8b5h&_nc_ht=scontent.ftgz1-1.fna&oh=00_AYDc-Uq2B4AwTc_ReCVFBKFIcF6BXW-v9i1JTtgihlN7GQ&oe=668C3ACD"
                name="Saco Doble Borde"
                precio="1989"
            ></Card>

           <Footer></Footer>
      </div>
    )}

    export default Ties;