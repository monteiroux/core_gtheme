/**
 * THEME CONFIGURATION
 * ===================
 * ✏️ EDITE ESTE ARQUIVO PARA CUSTOMIZAR O TEMA
 * 
 * ⚠️ IMPORTANTE: Você PODE editar APENAS:
 * - colors (cores do tema)
 * - categoryTitle e categorySubtitle
 * - categories (lista de categorias com imagens)
 * - faq (perguntas e respostas)
 * - faqTitle e faqSubtitle
 * - benefits (ícones, títulos, textos)
 * - footer.attendance (informações de contato)
 * - footer.whatsapp (números de WhatsApp)
 * 
 * ❌ NÃO pode editar:
 * - header, sliders, modals, ícones, assets (estão em core.js)
 * - Logo Pixelset, "site protegido" (estão em core.js)
 * - authorizedDomains (estão em core.js por segurança)
 */

const themeConfig = {
  // ========================================
  // 1. CORES (Você pode customizar)
  // ========================================
  colors: {
    bgColor: '#1E1E1E',
    textColor: '#FFFFFF',
    brandColor: '#B9F501',      // ← Cor principal do tema
    black: '#1E1E1E',
    white: '#FFFFFF',
    grey: '#4C4C4C'
  },

  // ========================================
  // 2. CATEGORIAS (Você pode customizar)
  // ========================================
  categoryTitle: 'Navegue por categoria',
  categorySubtitle: 'Escolha abaixo uma categoria para explorar nossos jogos',
  
  categories: [
    {
      img: 'https://cdn.awsli.com.br/2923/2923109/arquivos/cat-01.png',
      link: '#categoria-01',
      alt: 'Categoria 01'
    },
    {
      img: 'https://cdn.awsli.com.br/2923/2923109/arquivos/cat-02.png',
      link: '#categoria-02',
      alt: 'Categoria 02'
    },
    {
      img: 'https://cdn.awsli.com.br/2923/2923109/arquivos/cat-03.png',
      link: '#categoria-03',
      alt: 'Categoria 03'
    },
    {
      img: 'https://cdn.awsli.com.br/2923/2923109/arquivos/cat-04.png',
      link: '#categoria-04',
      alt: 'Categoria 04'
    },
    {
      img: 'https://cdn.awsli.com.br/2923/2923109/arquivos/cat-05.png',
      link: '#categoria-05',
      alt: 'Categoria 05'
    },
    {
      img: 'https://cdn.awsli.com.br/2923/2923109/arquivos/cat-06.png',
      link: '#categoria-06',
      alt: 'Categoria 06'
    },
    {
      img: 'https://cdn.awsli.com.br/2923/2923109/arquivos/cat-07.png',
      link: '#categoria-07',
      alt: 'Categoria 07'
    }
  ],

  // ========================================
  // 3. FAQ (Você pode customizar)
  // ========================================
  faqTitle: 'Perguntas Frequentes',
  faqSubtitle: 'Encontre respostas para as dúvidas mais comuns',

  faq: [
    {
      pergunta: 'Qual é o tempo de entrega?',
      resposta: 'O tempo de entrega varia entre 5 a 10 dias úteis, dependendo da sua localização. Você receberá um código de rastreamento após a confirmação do pedido.'
    },
    {
      pergunta: 'Como faço para rastrear meu pedido?',
      resposta: 'Você pode rastrear seu pedido usando o código de rastreamento enviado por email. Acesse o site da transportadora e insira o código.'
    },
    {
      pergunta: 'Qual é a política de devolução?',
      resposta: 'Aceitamos devoluções dentro de 30 dias após a compra. O produto deve estar em perfeito estado e com a embalagem original.'
    },
    {
      pergunta: 'Vocês oferecem garantia?',
      resposta: 'Sim! Todos os nossos produtos possuem garantia de fábrica. Produtos eletrônicos têm 12 meses de garantia.'
    },
    {
      pergunta: 'Como são as formas de pagamento?',
      resposta: 'Aceitamos cartão de crédito (até 12x sem juros), débito, PIX e boleto bancário.'
    }
  ],

  // ========================================
  // 4. BENEFÍCIOS (Você pode customizar)
  // ========================================
  benefits: [
    {
      icone: '🎧',
      titulo: 'Atendimento ao cliente',
      texto: 'Conte com suporte 24/7'
    },
    {
      icone: '📦',
      titulo: 'Frete rápido e grátis',
      texto: 'Frete grátis em pedidos de US$150 ou mais.'
    },
    {
      icone: '👥',
      titulo: 'Indique um amigo',
      texto: 'Indique um amigo e ganhem 15% de desconto cada um.'
    },
    {
      icone: '🔒',
      titulo: 'Pagamento seguro',
      texto: 'Suas informações de pagamento são processadas com segurança.'
    }
  ],

  // ========================================
  // 5. RODAPÉ - INFORMAÇÕES DE CONTATO
  //    (Você pode customizar)
  // ========================================
  footer: {
    // Informações de atendimento (você pode customizar)
    attendance: {
      title: 'Atendimento',
      hours: [
        'Segunda a sexta: 11:30 ás 22:00h',
        'Sabado: 10:00h ás 18:00h',
        'Domingo e Feriado: Fechado'
      ],
      whatsapp: {
        icon: 'https://cdn.awsli.com.br/2923/2923109/arquivos/whatsapp.svg',
        alt: 'Whatsapp',
        number: '(11) 98765-4321'
      },
      email: {
        icon: 'https://cdn.awsli.com.br/2923/2923109/arquivos/email.svg',
        alt: 'Email',
        address: 'contato@themegames.com.br'
      }
    },

    // WhatsApp com múltiplos números (você pode customizar)
    whatsapp: [
      {
        title: 'Vendas',
        phone: '5511999999999',
        display: '(11) 99999-9999',
        dropdownLabel: 'Fale conosco pelo WhatsApp'
      },
      {
        title: 'Suporte',
        phone: '5511988888888',
        display: '(11) 98888-8888'
      },
      {
        title: 'Financeiro',
        phone: '5511977777777',
        display: '(11) 97777-7777'
      }
    ]
  }
};

// Inicializa o tema com a configuração
$(document).ready(function() {
  initTheme(themeConfig);
});
