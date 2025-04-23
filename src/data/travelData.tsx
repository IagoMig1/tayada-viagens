import React from 'react';
export interface Travel {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
  longDescription?: string[];
  duration: string;
  price: number;
  groupSize?: number;
  departureLocation?: string;
  includes?: {
    transport: string[];
    accommodation: string[];
    meals: string[];
    activities: string[];
  };
  notIncluded?: string[];
}
export const travelData: Travel[] = [{
  id: 'rio-de-janeiro',
  title: 'Rio de Janeiro Completo',
  location: 'Rio de Janeiro, Brasil',
  image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  description: 'Conheça a Cidade Maravilhosa em um pacote completo que inclui os principais pontos turísticos, praias deslumbrantes e a vibrante cultura carioca.',
  longDescription: ['O Rio de Janeiro é uma das cidades mais icônicas do Brasil e do mundo. Nossa viagem começa com uma visita ao Cristo Redentor, uma das Sete Maravilhas do Mundo Moderno, de onde você terá uma vista panorâmica espetacular da cidade.', 'Nos dias seguintes, visitaremos o Pão de Açúcar, as famosas praias de Copacabana e Ipanema, e faremos um passeio pelo centro histórico e cultural da cidade. Você também terá tempo livre para aproveitar a culinária local e a vibrante vida noturna carioca.', 'Nossa programação inclui ainda uma visita à Escadaria Selarón, ao Maracanã e um dia especial no Jardim Botânico. Para os amantes da natureza, faremos uma trilha leve na Floresta da Tijuca, a maior floresta urbana do mundo.'],
  duration: '5 dias',
  price: 2890,
  groupSize: 15,
  departureLocation: 'São Paulo',
  includes: {
    transport: ['Passagens aéreas ida e volta', 'Traslados aeroporto-hotel-aeroporto', 'Transporte para todos os passeios inclusos'],
    accommodation: ['4 noites em hotel 4 estrelas em Copacabana', 'Café da manhã incluso', 'Quarto com vista para o mar (mediante disponibilidade)'],
    meals: ['Café da manhã diário no hotel', '2 almoços em restaurantes típicos', 'Jantar de boas-vindas com show de samba'],
    activities: ['Ingresso para o Cristo Redentor', 'Ingresso para o Pão de Açúcar', 'Tour guiado pelo centro histórico', 'Visita ao Maracanã', 'Trilha na Floresta da Tijuca']
  },
  notIncluded: ['Refeições não mencionadas', 'Bebidas alcoólicas', 'Gorjetas', 'Despesas pessoais', 'Seguro viagem (recomendamos a contratação)']
}, {
  id: 'fernando-de-noronha',
  title: 'Paraíso em Fernando de Noronha',
  location: 'Fernando de Noronha, Brasil',
  image: 'https://images.unsplash.com/photo-1729382215929-75812f7a113f?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'Descubra o paraíso ecológico de Fernando de Noronha, com suas praias de águas cristalinas, fauna marinha diversificada e paisagens de tirar o fôlego.',
  longDescription: ['Fernando de Noronha é um arquipélago vulcânico considerado um dos destinos mais preservados e paradisíacos do Brasil. Nosso pacote oferece a experiência completa deste santuário ecológico, com foco em ecoturismo e contato com a natureza.', 'Visitaremos as principais praias do arquipélago, como a Baía do Sancho, eleita várias vezes como a mais bonita do mundo, a Praia do Leão e a Praia do Sueste. Cada uma delas oferece uma experiência única de mergulho, com chance de ver tartarugas, raias, tubarões e uma infinidade de peixes coloridos.', 'O passeio de barco ao redor da ilha proporciona vistas espetaculares das formações rochosas e a oportunidade de avistar golfinhos. Também faremos trilhas ecológicas guiadas para conhecer a flora e fauna locais, além de visitas a mirantes estratégicos para contemplar o pôr do sol inesquecível.'],
  duration: '7 dias',
  price: 8950,
  groupSize: 12,
  departureLocation: 'Recife',
  includes: {
    transport: ['Passagens aéreas Recife-Noronha-Recife', 'Traslados aeroporto-pousada-aeroporto', 'Transporte para os passeios inclusos'],
    accommodation: ['6 noites em pousada categoria superior', 'Café da manhã incluso', 'Acomodação com vista para o mar'],
    meals: ['Café da manhã diário na pousada', '3 almoços em restaurantes locais', 'Jantar de despedida com frutos do mar'],
    activities: ['Taxa de preservação ambiental', 'Passeio de barco ao redor da ilha', 'Tour guiado às principais praias', 'Equipamento básico para snorkeling', 'Trilhas ecológicas com guia especializado']
  },
  notIncluded: ['Refeições não mencionadas', 'Bebidas alcoólicas', 'Mergulho com cilindro (disponível com custo adicional)', 'Despesas pessoais', 'Seguro viagem (obrigatório)']
}, {
  id: 'gramado-canela',
  title: 'Encantos da Serra Gaúcha',
  location: 'Gramado e Canela, Brasil',
  image: 'https://images.unsplash.com/photo-1690907938160-133874466bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'Visite as charmosas cidades de Gramado e Canela, com sua arquitetura europeia, gastronomia refinada e atrações culturais únicas.',
  longDescription: ['Gramado e Canela são destinos que encantam visitantes de todo o Brasil com seu clima ameno, arquitetura bávara e atmosfera acolhedora. Nossa viagem começa com um passeio pelo centro de Gramado, visitando a famosa Rua Coberta e a charmosa Avenida Borges de Medeiros.', 'Conheceremos os principais pontos turísticos da região, como o Lago Negro, o Mini Mundo, o Mundo a Vapor e o Snowland, o único parque de neve indoor do Brasil. Em Canela, visitaremos a imponente Catedral de Pedra e o belíssimo Parque do Caracol, com sua impressionante cascata.', 'Um dos destaques da viagem é a Rota do Chocolate, onde visitaremos fábricas e lojas de chocolates artesanais que são a marca registrada da região. Também desfrutaremos da excelente gastronomia local, com influências da colonização italiana e alemã.'],
  duration: '5 dias',
  price: 3450,
  groupSize: 20,
  departureLocation: 'Porto Alegre',
  includes: {
    transport: ['Traslados aeroporto-hotel-aeroporto', 'Transporte em ônibus de turismo para todos os passeios'],
    accommodation: ['4 noites em hotel categoria superior no centro de Gramado', 'Café da manhã incluso', 'Quarto com lareira (mediante disponibilidade)'],
    meals: ['Café da manhã diário no hotel', '2 jantares típicos (fondue e café colonial)', 'Degustação na rota do chocolate'],
    activities: ['Ingressos para o Mini Mundo', 'Ingressos para o Mundo a Vapor', 'Visita ao Parque do Caracol', 'Tour pela Rota do Chocolate', 'City tour em Gramado e Canela']
  },
  notIncluded: ['Passagens aéreas', 'Refeições não mencionadas', 'Ingresso para o Snowland (opcional)', 'Despesas pessoais', 'Gorjetas']
}, {
  id: 'pantanal',
  title: 'Expedição Pantanal',
  location: 'Pantanal, Brasil',
  image: 'https://images.unsplash.com/photo-1684062786463-d67ad62ae77f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'Aventure-se no maior pantanal do mundo, observando a fauna e flora exuberantes em um dos ecossistemas mais ricos em biodiversidade do planeta.',
  duration: '6 dias',
  price: 5690,
  includes: {
    transport: ['Traslados aeroporto-lodge-aeroporto', 'Transporte em veículos 4x4 para safáris'],
    accommodation: ['5 noites em lodge ecológico', 'Acomodação com ventilador ou ar-condicionado'],
    meals: ['Pensão completa (café, almoço e jantar)', 'Água mineral durante os passeios'],
    activities: ['Safáris fotográficos diurnos e noturnos', 'Passeio de barco pelos rios pantaneiros', 'Caminhadas ecológicas com guias especializados', 'Observação de aves', 'Pesca esportiva (pesque e solte)']
  }
}, {
  id: 'amazonia',
  title: 'Imersão na Amazônia',
  location: 'Manaus, Brasil',
  image: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
  description: 'Explore a maior floresta tropical do mundo, navegando pelo Rio Negro, conhecendo comunidades ribeirinhas e descobrindo a rica biodiversidade amazônica.',
  duration: '7 dias',
  price: 6290,
  includes: {
    transport: ['Traslados aeroporto-hotel-lodge-aeroporto', 'Barco exclusivo para os passeios fluviais'],
    accommodation: ['2 noites em hotel em Manaus', '4 noites em lodge na selva'],
    meals: ['Café da manhã diário', 'Pensão completa durante a estadia no lodge', 'Frutas regionais nos passeios'],
    activities: ['Visita ao Encontro das Águas', 'Passeio noturno para observação de jacarés', 'Pesca de piranhas', 'Visita a comunidades indígenas', 'Caminhada na selva com guia especializado']
  }
}, {
  id: 'paris-roma',
  title: 'Paris e Roma Clássicas',
  location: 'França e Itália',
  image: 'https://images.unsplash.com/photo-1653530899380-3eb904d6e2a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'Conheça duas das cidades mais icônicas da Europa em uma única viagem. De Paris a Roma, explore séculos de história, arte e cultura.',
  duration: '10 dias',
  price: 12890,
  includes: {
    transport: ['Passagens aéreas internacionais', 'Passagem aérea Paris-Roma', 'Traslados privados'],
    accommodation: ['5 noites em hotel 4 estrelas em Paris', '4 noites em hotel 4 estrelas em Roma', 'Café da manhã incluso'],
    meals: ['Café da manhã diário nos hotéis', 'Jantar de boas-vindas em Paris', 'Jantar de despedida em Roma'],
    activities: ['City tour em Paris com guia em português', 'Ingresso para o Museu do Louvre', 'Ingresso para a Torre Eiffel', 'City tour em Roma com guia em português', 'Ingresso para o Coliseu e Fórum Romano', 'Visita ao Vaticano com Museus Vaticanos']
  }
}, {
  id: 'orlando',
  title: 'Magia de Orlando',
  location: 'Flórida, EUA',
  image: 'https://images.unsplash.com/photo-1575089776834-8be34696ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  description: 'Divirta-se nos principais parques temáticos de Orlando, com atrações para todas as idades e momentos inesquecíveis para toda a família.',
  duration: '10 dias',
  price: 11490,
  includes: {
    transport: ['Passagens aéreas internacionais', 'Traslados aeroporto-hotel-aeroporto', 'Transporte para os parques'],
    accommodation: ['9 noites em hotel categoria turística superior', 'Café da manhã continental'],
    meals: ['Café da manhã diário no hotel', 'Cartão refeição para os parques'],
    activities: ['Ingressos para 4 parques do Walt Disney World', 'Ingressos para 2 parques da Universal', 'Ingresso para o SeaWorld', 'Compras em Premium Outlets', 'Assistência de guia brasileiro']
  }
}, {
  id: 'cancun',
  title: 'Paraíso em Cancún',
  location: 'México',
  image: 'https://images.unsplash.com/photo-1590591092470-37e9fe614b60?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'Desfrute das praias paradisíacas de águas azul-turquesa de Cancún, com todo o conforto de um resort all-inclusive e atrações culturais maias.',
  duration: '7 dias',
  price: 8790,
  includes: {
    transport: ['Passagens aéreas internacionais', 'Traslados aeroporto-hotel-aeroporto'],
    accommodation: ['6 noites em resort 5 estrelas all-inclusive', 'Quarto com vista para o mar'],
    meals: ['Sistema all-inclusive (café, almoço, jantar e bebidas)', 'Acesso a restaurantes temáticos do resort'],
    activities: ['Excursão a Chichén Itzá', 'Visita a um cenote sagrado', 'Passeio a Isla Mujeres', 'Festa temática mexicana', 'Atividades recreativas no resort']
  }
}];