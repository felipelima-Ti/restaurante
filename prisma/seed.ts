/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ProductSeed = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
};

type CategorySeed = {
  name: string;
  products: ProductSeed[];
};

type RestaurantSeed = {
  baseInfo: {
    name: string;
    slug: string;
    description: string;
    avatarImageUrl: string;
    coverImageUrl: string;
  };
  categories: CategorySeed[];
};

const createRestaurantWithMenu = async (
  prisma: PrismaClient,
  restaurantData: RestaurantSeed
) => {
  const restaurant = await prisma.restaurant.create({
    data: restaurantData.baseInfo,
  });

  for (const category of restaurantData.categories) {
    const createdCategory = await prisma.menuCategory.create({
      data: {
        name: category.name,
        restaurantId: restaurant.id,
      },
    });

    for (const product of category.products) {
      await prisma.product.create({
        data: {
          ...product,
          menuCategoryId: createdCategory.id,
          restaurantId: restaurant.id,
        },
      });
    }
  }
};

const main = async () => {
  // Limpa dados antigos
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.restaurant.deleteMany();

  // FastBurguer
  const fastburguerData: RestaurantSeed = {
    baseInfo: {
      name: "FastBurguer",
      slug: "fast-burguer",
      description: "O melhor fast food do mundo",
      avatarImageUrl:
        "https://github.com/felipelima-Ti/restaurante/blob/main/public/logoi.png?raw=true",
      coverImageUrl:
        "https://github.com/felipelima-Ti/restaurante/blob/main/public/background.png?raw=true",
    },
    categories: [
      {
        name: "Combos",
        products: [
          {
            name: "Oferta hamburguer queijo combo com refrigerante e batata frita",
            description:
              "hambúrguere (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial,tomate, picles e pão com gergilim, acompanhamento e bebida e uma batata frita.",
            price: 39.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/Combo.png?raw=true",
            ingredients: [
              "Pão com gergilim",
              "Hambúrguer de carne 100% bovina",
              "Alface",
              "Queijo sabor cheddar",
              "Molho especial",
              "tomate",
              "Picles",
            ],
          },
          {
            name: "Novo Cheese-burguer com milk shake",
            description:
              "Dois hambúrgueres de carne 100% bovina,mais duas fatias de queijo! Acompanhamento de um milk shake.",
            price: 31.5,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/chesse-burguer.png?raw=true",
            ingredients: [
              "Pão com gergilim",
              "Hambúrguer de carne 100% bovina",
              "Queijo processado sabor cheddar",
            ],
          },
          {
            name: "Combo XSandwich",
            description:
              "Composto por pão , molho Honey&Fire, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
            price: 39.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/sanduiche.png?raw=true",
            ingredients: [
              "Pão tipo brioche",
              "Molho Honey&Fire",
              "Alface",
              "Tomate",
              "Queijo sabor cheddar",
              "Carne 100% de peito de frango",
            ],
          },
          {
            name: "Combo burguer-frango",
            description:
              "hambúrguerer de frango, pão com gergelim,tomate,alface e acompanhamento de batata frita.",
            price: 36.2,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/burguer-frango.png?raw=true",
            ingredients: [
              "Pão com gergelim",
              "Hambúrguer de carne de frango",
              "Tomate",
              "Alface",
            ],
          },
        ],
      },
      {
        name: "Lanches",
        products: [
          {
            name: "hamburguer com queijo ",
            description:
              "hambúrguer(100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
            price: 39.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/hamburguer.png?raw=true",
            ingredients: [
              "Pão com gergilim",
              "Hambúrguer de carne 100% bovina",
              "Alface americana",
              "Queijo fatiado sabor cheddar",
              "Molho especial",
              "Tomate",
              "Picles",
            ],
          },
          {
            name: "Duplo Cheese-burguer",
            description:
              "Dois hambúrgueres de carne 100% bovina,queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória!.",
            price: 41.5,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/duplo-chesse.png?raw=true",
            ingredients: [
              "Pão tipo brioche",
              "Hambúrguer de carne 100% bovina",
              "Queijo processado sabor cheddar",
              "Molho lácteo com queijo tipo cheddar",
            ],
          },
          {
            name: "Xsandwich",
            description:
              "Composto por pão tipo brioche com molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango.",
            price: 39.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/sandwichh.png?raw=true",
            ingredients: [
              "Pão tipo brioche",
              "Molho Honey&Fire",
              "Bacon em fatias",
              "Alface",
              "Tomate",
              "Queijo sabor cheddar",
              "Carne 100% de peito de frango",
            ],
          },
          {
            name: "Burguer-frango",
            description:
              "hambúrguerer (100% carne frango),alface,tomate e pão com gergelim.",
            price: 36.2,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/burgue-frangoo.png?raw=true",
            ingredients: [
              "Pão com gergelim",
              "alface",
              "tomate",
              "Hambúrguer de carne 100% frango",
            ],
          },
        ],
      },
      {
        name: "Fritas",
        products: [
          {
            name: "Fritas Grande",
            description: "Batatas fritas crocantes e sequinhas. Vem bastante!",
            price: 10.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/batata%20grande.png?raw=true",
            ingredients: ["batata", "queijo tipo cheddar", "bacon"],
          },
          {
            name: "Fritas Média",
            description:
              "Batatas fritas crocantes e sequinhas. Vem uma média quantidade!",
            price: 9.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/batata.png?raw=true",
            ingredients: [],
          },
          {
            name: "Fritas Pequena",
            description: "Batatas fritas crocantes e sequinhas!",
            price: 5.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/batata.png?raw=true",
            ingredients: [],
          },
        ],
      },
      {
        name: "Bebidas",
        products: [
          {
            name: "Coca-cola",
            description: "Coca-cola gelada para acompanhar seu lanche.",
            price: 5.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/coca.png?raw=true",
            ingredients: [],
          },
          {
            name: "Fanta Laranja",
            description: "Fanta Laranja gelada para acompanhar seu lanche.",
            price: 5.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/fanta.png?raw=true",
            ingredients: [],
          },
          {
            name: "Água Mineral",
            description: "A bebida favorita do Cristiano Ronaldo.",
            price: 2.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/agua.png?raw=true",
            ingredients: [],
          },
        ],
      },
      {
        name: "Sobremesas",
        products: [
          {
            name: "Casquinha de Baunilha",
            description: "Casquinha de sorvete sabor baunilha.",
            price: 3.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/sorvete-baunilha.png?raw=true",
            ingredients: [],
          },
          {
            name: "Casquinha de Chocolate",
            description: "Casquinha de sorvete sabor chocolate.",
            price: 3.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/sorvete-chocolate.png?raw=true",
            ingredients: [],
          },
          {
            name: "Casquinha de Mista",
            description: "Caquinha sorvete misto de chocolate e baunilha",
            price: 2.9,
            imageUrl:
              "https://github.com/felipelima-Ti/restaurante/blob/main/public/sorvete-misto.png?raw=true",
            ingredients: [],
          },
        ],
      },
    ],
  };

  await createRestaurantWithMenu(prisma, fastburguerData);

  // PizzaTop (outro restaurante)
  const pizzatopData: RestaurantSeed = {
    baseInfo: {
      name: "PizzaTop",
      slug: "pizza-top",
      description: "As melhores pizzas artesanais",
      avatarImageUrl: "https://github.com/felipelima-Ti/restaurante/blob/main/public/pizzaa.png?raw=true",
      coverImageUrl: "https://github.com/felipelima-Ti/restaurante/blob/main/public/background-pizza.png?raw=true",
    },
    categories: [
      {
        name: "Pizzas Salgadas",
        products: [
          {
            name: "Pizza Calabresa",
            description: "Molho de tomate, calabresa, cebola e mussarela",
            price: 39.9,
            imageUrl: "https://github.com/felipelima-Ti/restaurante/blob/main/public/calabreza.png?raw=true",
            ingredients: ["Molho de tomate", "Calabresa", "Cebola", "Mussarela"],
          },
          {
            name: "Pizza Portuguesa",
            description: "Presunto, ovos, cebola, azeitona, pimentão e queijo",
            price: 42.9,
            imageUrl: "https://github.com/felipelima-Ti/restaurante/blob/main/public/portuguesa.png?raw=true",
            ingredients: [
              "Presunto",
              "Ovos",
              "Cebola",
              "Azeitona",
              "Pimentão",
              "Mussarela",
            ],
          },
          {
            name:"marguerita",
            description:"Criada no ano de 1889 pelo pizzaiolo Rafaelle Esposito, para homenagear a rainha Margarida de Saboia por ter encontrado solução em um momento histórico importante",
            price:45.9,
            imageUrl:"https://github.com/felipelima-Ti/restaurante/blob/main/public/marguerita.png?raw=true",
            ingredients:[
              "Tomate ou molho de tomate",
              "Muçarela de búfala",
              "Manjericão fresco"
            ]
          },
        {
          name:"frango com catupiry",
          description:"uma deliciosa pizza com frango desfiado e catupiry",
          price:42.0,
          imageUrl:"https://github.com/felipelima-Ti/restaurante/blob/main/public/frango.png?raw=true",
          ingredients:[
            "massa de pizza",
            "frango desfiado",
            "catupiry"
          ]
        },
        {
         name:"4-queijos",
         description:"delicosa pizza com 4 tipos de queijo para os amantes de queijo",
         price: 40.0, 
         imageUrl:"https://github.com/felipelima-Ti/restaurante/blob/main/public/4queijo.png?raw=true",
         ingredients:[
          "Mussarela",
          "Gongonzola",
          "Parmesão",
          "Provolone"
         ]
        },

        ],
      },
      {
        name: "Pizzas Doces",
        products: [
          {
            name: "Pizza de Chocolate com morango",
            description: "Cobertura de chocolate ao leite com morango",
            price: 34.9,
            imageUrl: "https://github.com/felipelima-Ti/restaurante/blob/main/public/chocolate.png?raw=true",
            ingredients: [
              "Massa doce", 
              "Chocolate ao leite",
               "Morango"
              ],
          },
          {
            name:"pizza de brigadeiro",
            description:"deliciosa pizza sabor de brigadeiro com granulado",
            price: 42.2,
            imageUrl:"https://github.com/felipelima-Ti/restaurante/blob/main/public/brigadeiro.png?raw=true",
            ingredients: [
              "Massa doce",
              "brigadeiro",
              "Granulado"
            ]
          },
          {
           name:"Prestigio",
           description:"deliciosa pizza sabor prestigio com cobertura de chocolate e coco com cerejas",
           price: 46.5,
           imageUrl:"https://github.com/felipelima-Ti/restaurante/blob/main/public/prestigio.png?raw=true",
           ingredients:[
            "Massa doce",
            "Chocolate",
            "Coco",
            "Cerejas"
           ]
          },
          {
            name:"banana e chocolate",
            description:"deliciosa pizza sabor banana com cobertura de chocolate",
            price: 42.3,
            imageUrl:"https://github.com/felipelima-Ti/restaurante/blob/main/public/banana.png?raw=true",
            ingredients: [
              "Massa doce",
              "Chocolate",
              "Banana"
            ]
          },
        ],
      },
     
    ],
  };

  await createRestaurantWithMenu(prisma, pizzatopData);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
