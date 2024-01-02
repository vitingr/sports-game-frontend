import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[1250px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
      <h1 className="font-bold text-3xl w-full transition-all duration-300 hover:text-indigo-600 cursor-default mt-4">
        Loja de Pacotes
      </h1>
      <p className="text-[#717171]">
        A loja oferece uma infinidade de recursos, pacotes e outras formas de adquirir itens atráves de futpoints ou futcoins. É uma excelente forma de reforçar seu time, e adquirir jogadores, emblemas e colecionáveis, caso você não goste dos itens, você pode vender eles futuramente.
      </p>
      <div className="flex flex-wrap justify-around w-full gap-16 mt-[4em]">
        <div className="card cursor-pointer" id="especial">
          <div className="img-box">
            <Image
              src={"/assets/rare-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Players Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote recheado somente com jogadores ouro e talvez um
              especial.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              35.000
            </h2>
            <form action="/jogador/playersPack" method="POST">
              <button className="comprar-produto">Comprar Pacote</button>
            </form>
          </div>
        </div>

        <div className="card" id="gold">
          <div className="img-box">
            <Image
              src={"/assets/gold-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Rare Gold Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote repleto de jogadores e itens ouro, entre eles, min. 3
              Raros.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              15.000
            </h2>
            <form action="/jogador/rareGoldPack" method="POST">
              <button className="comprar-produto">Comprar Pacote</button>
            </form>
          </div>
        </div>

        <div className="card" id="gold">
          <div className="img-box">
            <Image
              src={"/assets/gold-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Gold Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote repleto de jogadores e itens ouro, entre eles, min. 1
              Raro.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              10.000
            </h2>
            <form action="/jogador/goldPack" method="POST">
              <button className="comprar-produto">Comprar Pacote</button>
            </form>
          </div>
        </div>

        <div className="card" id="silver">
          <div className="img-box">
            <Image
              src={"/assets/silver-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Rare Silver Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote repleto de jogadores e itens prata, entre eles, min. 3
              Raros.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              5.000
            </h2>
            <form action="/jogador/rareSilverPack" method="POST">
              <button className="comprar-produto">Comprar Pacote</button>
            </form>
          </div>
        </div>

        <div className="card" id="silver">
          <div className="img-box">
            <Image
              src={"/assets/silver-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Silver Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote repleto de jogadores e itens prata, entre eles, min. 1
              Raro.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              2.500
            </h2>
            <form action="/jogador/silverPack" method="POST">
              <button className="comprar-produto">Comprar Pacote</button>
            </form>
          </div>
        </div>

        <div className="card" id="bronze">
          <div className="img-box">
            <Image
              src={"/assets/bronze-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Bronze Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote repleto de jogadores e itens bronze, entre eles, min. 3
              Raros.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              500
            </h2>
            <form action="/jogador/bronzePack" method="POST">
              <button className="comprar-produto">Comprar Pacote</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
