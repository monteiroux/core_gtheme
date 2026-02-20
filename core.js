/**
 * THEME ENGINE - CORE
 * ===================
 * 
 * Este arquivo contém:
 * 1. LÓGICA DO SISTEMA (não editável)
 * 2. CONFIGURAÇÕES IMUTÁVEIS (seu controle - não editável pelo cliente)
 * 
 * O cliente PODE editar apenas: colors, faq, benefits, contact, whatsapp, categories
 * Tudo mais fica aqui (core.js) sob seu controle
 */

/**
 * ========================================
 * DOMÍNIOS AUTORIZADOS (CORE - SEGURO)
 * ========================================
 */
const AUTHORIZED_DOMAINS_MAP = {
  'cliente-themegames': [
    'demo-gametheme2.lojaintegrada.com.br'
  ],
  'cliente-novo': [
    'localhost',
    '127.0.0.1',
    'seu-dominio.com.br',
    'www.seu-dominio.com.br',
    '*.seu-dominio.com.br'
  ]
};

/**
 * ========================================
 * CONFIGURAÇÕES IMUTÁVEIS (SEU CONTROLE)
 * ========================================
 * Estas configurações não podem ser alteradas pelo cliente
 * Se precisar customizar, edite aqui
 */
const CORE_CONFIG = {
  // ========================================
  // CABEÇALHO (Estrutura fixa)
  // ========================================
  header: {
    showLoginButton: true,
    loginLabel: 'Entrar',
    loginUrl: '/conta/login',
    loginIcon: 'https://cdn.awsli.com.br/2923/2923109/arquivos/user.svg',
    searchIcon: 'https://cdn.awsli.com.br/2923/2923109/arquivos/search.svg',
    menuIcon: 'https://cdn.awsli.com.br/2923/2923109/arquivos/menu.svg'
  },

  // ========================================
  // SLIDERS CONFIGURAÇÃO (Fixo)
  // ========================================
  categorySlider: {
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  },

  productSlider: {
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    dots: false,
    speed: 400,
    draggable: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  },

  // ========================================
  // PRODUTOS (Configuração)
  // ========================================
  products: {
    showPaymentButton: true,
    paymentButtonLabel: 'Forma de pagamento',
    paymentModalTitle: 'Formas de pagamento'
  },

  // ========================================
  // RODAPÉ - ELEMENTOS FIXOS (Seu controle)
  // ========================================
  footer: {
    showPixelsetLogo: true,
    customSeal: 'https://cdn.awsli.com.br/2923/2923109/arquivos/site-protegido.svg',
    feito: {
      url: 'https://www.pixelset.com.br/',
      imageUrl: 'https://pages.greatpages.com.br/www.pixelset.com.br/1768577291/imagens/desktop/3485744_1_176857398507036064.svg',
      alt: 'Pixelset'
    }
  },

  // ========================================
  // MODAIS (Configuração fixa)
  // ========================================
  modals: {
    showFilterModal: true,
    filterLabel: 'Filtrar'
  },

  // ========================================
  // ÍCONES E ASSETS (URLs fixas - SEU CONTROLE)
  // ========================================
  icons: {
    mobileCloseIcon: 'https://cdn.awsli.com.br/2923/2923109/arquivos/close.svg',
    fontAwesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
  },

  // ========================================
  // FONTE (Fixo)
  // ========================================
  font: {
    name: 'Chakra Petch',
    url: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap'
  }
};

/**
 * ========================================
 * THEME ENGINE CLASS
 * ========================================
 */
class ThemeEngine {
  // ========================================
  // DOMÍNIOS AUTORIZADOS (CORE)
  // ========================================
  static get AUTHORIZED_DOMAINS() {
    const clientId = window.THEME_CLIENT_ID || 'cliente-novo';
    
    if (!AUTHORIZED_DOMAINS_MAP[clientId]) {
      console.error(`❌ ThemeEngine: Client ID '${clientId}' não encontrado em AUTHORIZED_DOMAINS_MAP`);
      return [];
    }
    
    return AUTHORIZED_DOMAINS_MAP[clientId];
  }

  constructor(config = {}) {
    this.config = config;
    this.authorized = false;
    this.coreConfig = CORE_CONFIG;
    this.init();
  }

  // ========================================
  // 1. VALIDAÇÃO DE DOMÍNIO (SEGURO)
  // ========================================
  validateDomain() {
    const authorizedDomains = ThemeEngine.AUTHORIZED_DOMAINS;
    
    if (!authorizedDomains || authorizedDomains.length === 0) {
      console.error('❌ ThemeEngine: Nenhum domínio autorizado configurado para este cliente');
      return false;
    }

    const currentDomain = window.location.hostname;
    const isAuthorized = authorizedDomains.some(domain => {
      const escapedDomain = domain
      .replace(/\./g, '\\.')  // Escapa os pontos primeiro
      .replace(/\*/g, '.*');   // Depois trata wildcards
      const pattern = new RegExp('^' + escapedDomain + '$');
      return pattern.test(currentDomain);
    });

    if (!isAuthorized) {
      console.error(`❌ Domínio não autorizado: ${currentDomain}`);
      console.warn(`Domínios permitidos:`, authorizedDomains);
      return false;
    }

    console.log(`✅ Domínio autorizado: ${currentDomain}`);
    this.authorized = true;
    return true;
  }

  // ========================================
  // 2. INICIALIZAÇÃO
  // ========================================
  init() {
    if (!this.validateDomain()) {
      return;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.execute());
    } else {
      this.execute();
    }
  }

  execute() {
    if (!this.authorized) return;

    this.renderHeader();
    this.renderBanners();
    this.renderCategories();
    this.renderProducts();
    this.renderFooter();
    this.renderModals();
    this.renderFAQ();
    this.renderBenefits();
    this.adjustImages();
    this.setupResponsive();
  }

  // ========================================
  // 3. CABEÇALHO
  // ========================================
  renderHeader() {
    const header = this.coreConfig.header;

    if (header.showLoginButton) {
      $('#cabecalho .span8.busca-mobile').after(`
        <div class="h-actions hidden-phone">
          <a href="${header.loginUrl}" class="h-user">
            <img src="${header.loginIcon}" alt="Minha conta">
            <span>${header.loginLabel}</span>
          </a>
        </div>
      `);

      $('#cabecalho .conteudo-topo .inferior').after(`
        <div class="h-actions visible-phone">
          <a href="${header.loginUrl}" class="h-user">
            <img src="${header.loginIcon}" alt="Minha conta">
            <span>${header.loginLabel}</span>
          </a>
          <div class="h-search visible-phone">
            <img src="${header.searchIcon}" alt="Buscar">
          </div>
          <div class="h-menu visible-phone">
            <img src="${header.menuIcon}" alt="Menu">
          </div>
        </div>
      `);
    }
  }

  // ========================================
  // 4. BANNERS
  // ========================================
  renderBanners() {
    $('.banner.cheio .flex-direction-nav').prepend($('.banner.cheio .flex-control-nav'));
  }

  // ========================================
  // 5. CATEGORIAS (Dados do cliente em config.js)
  // ========================================
  renderCategories() {
    if (!this.config.categories || this.config.categories.length === 0) return;

    const categoriaLis = this.config.categories.map(c => `
      <li class="c-item">
        <a href="${c.link}">
          <img src="${c.img}" alt="${c.alt}">
        </a>
      </li>
    `).join('');

    const categorySection = `
      <div class="c-slide-section">
        <div class="c-slide-header">
          <h2 class="c-slide-title">${this.config.categoryTitle || 'Navegue por categoria'}</h2>
          <p class="c-slide-subtitle">${this.config.categorySubtitle || 'Escolha abaixo uma categoria'}</p>
        </div>
        <ul class="c-slide">
          ${categoriaLis}
        </ul>
      </div>
    `;

    $('.pagina-inicial #listagemProdutos').before(categorySection);

    this.initSlider('.c-slide', this.coreConfig.categorySlider);
  }

  // ========================================
  // 6. PRODUTOS
  // ========================================
  renderProducts() {
    const $carousel = $('#listagemProdutos .produtos-carrossel');
    if ($carousel.length && !$carousel.hasClass('slick-initialized')) {
      $carousel.removeAttr('style');
      $carousel.find('li').removeAttr('style');
      this.initSlider($carousel, this.coreConfig.productSlider);
    }

    if (this.coreConfig.products.showPaymentButton) {
      $('.info-principal-produto').after(`
        <button class="btn-forma-pagamento">${this.coreConfig.products.paymentButtonLabel}</button>
      `);

      $('body').append(`
        <div id="modal-pagamento">
          <div class="modal-conteudo">
            <div class="modal-header">
              <h3>${this.coreConfig.products.paymentModalTitle}</h3>
              <button class="fechar-modal">✕</button>
            </div>
          </div>
        </div>
      `);

      $('.parcelas-produto').appendTo('#modal-pagamento .modal-conteudo');

      $(document).on('click', '.btn-forma-pagamento', () => {
        $('#modal-overlay, #modal-pagamento').addClass('ativo');
      });
      $(document).on('click', '.fechar-modal, #modal-overlay', () => {
        $('#modal-overlay, #modal-pagamento').removeClass('ativo');
      });
    }

    $('.produto .conteiner-imagem #abreZoom').remove();
  }

  // ========================================
  // 7. RODAPÉ (Estrutura + dados cliente)
  // ========================================
  renderFooter() {
    const footer = this.coreConfig.footer;
    const clientFooter = this.config.footer || {};

    // Selo customizado
    if (footer.customSeal) {
      $('.selos li:first-child img').attr('src', footer.customSeal);
    }

    // Logo Pixelset
    if (footer.showPixelsetLogo) {
      $('#rodape>div:last-child .conteiner .row-fluid div:not(.span12)').before(`
        <div class="feito-pixelset">
          <a href="${footer.feito.url}" class="pixel-logo" target="_blank">
            <img src="${footer.feito.imageUrl}" alt="${footer.feito.alt}">
          </a>
        </div>
      `);
    }

    // Atendimento (dados do cliente)
    if (clientFooter.attendance) {
      const attendanceHtml = this.buildAttendanceSection(clientFooter.attendance);
      $('#rodape .sobre-loja-rodape').replaceWith(attendanceHtml);
    }

    // WhatsApp dropdown (dados do cliente)
    if (clientFooter.whatsapp && clientFooter.whatsapp.length > 0) {
      this.renderWhatsAppDropdown(clientFooter.whatsapp);
    }
  }

  buildAttendanceSection(attendance) {
    if (!attendance) return '';

    return `
      <div class="span4 atendimento-rodape">
        <span class="titulo">${attendance.title || 'Atendimento'}</span>
        <ul>
          ${attendance.hours.map(hour => `<li>${hour}</li>`).join('')}
          <li style="margin-top:10px;">
            <img src="${attendance.whatsapp.icon}" alt="WhatsApp" style="vertical-align:middle; width:20px; margin-right:8px;">
            ${attendance.whatsapp.number}
          </li>
          <li style="margin-top:5px;">
            <img src="${attendance.email.icon}" alt="Email" style="vertical-align:middle; width:20px; margin-right:8px;">
            <a href="mailto:${attendance.email.address}" style="color:inherit; text-decoration:none;">${attendance.email.address}</a>
          </li>
        </ul>
      </div>
    `;
  }

  renderWhatsAppDropdown(numbers) {
    const whatsappHtml = `
      <div class="whatsapp-dropdown">
        <button class="whatsapp-btn" type="button">
          <i class="fa fa-whatsapp"></i> ${numbers[0].dropdownLabel || 'Fale conosco pelo WhatsApp'}
        </button>
        <ul class="whatsapp-dropdown-menu" style="display: none;">
          ${numbers.map(num => `
            <li>
              <strong>${num.title}:</strong> <a href="https://wa.me/${num.phone}" target="_blank">${num.display}</a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    $('#rodape .institucional .lista-redes').after(whatsappHtml);

    $(document).on('click', '.whatsapp-btn', function () {
      const $dropdown = $(this).closest('.whatsapp-dropdown');
      $dropdown.toggleClass('open');
      const $menu = $dropdown.find('.whatsapp-dropdown-menu');
      if ($dropdown.hasClass('open')) {
        $menu.slideDown(150);
      } else {
        $menu.slideUp(150);
      }
    });
  }

  // ========================================
  // 8. MODAIS
  // ========================================
  renderModals() {
    if (this.coreConfig.modals.showFilterModal) {
      $('.ordenar-listagem.topo .row-fluid').append(`
        <button class="btn btn-filtrar" data-toggle="modal" data-target="#modalFiltros">
          ${this.coreConfig.modals.filterLabel}
        </button>
      `);

      $('.pagina-categoria .conteudo > .titulo').prepend($('.pagina-categoria .breadcrumbs'));
      $('.ordenar-listagem.topo > .row-fluid').prepend($('.pagina-categoria .conteudo > .titulo'));
      $('.ordenar-listagem .row-fluid > .span6').removeClass('span6');
    }
  }

  // ========================================
  // 9. FAQ (Dados do cliente)
  // ========================================
  renderFAQ() {
    if (!this.config.faq || this.config.faq.length === 0) return;

    let faqHtml = `
      <section class="faq-section">
        <div class="faq-container">
          <h2>${this.config.faqTitle || 'Perguntas Frequentes'}</h2>
          <p>${this.config.faqSubtitle || ''}</p>
          <div class="faq-list">
    `;

    this.config.faq.forEach(item => {
      faqHtml += `
        <div class="faq-item">
          <div class="faq-pergunta">
            <span>${item.pergunta}</span>
            <span class="faq-icon">+</span>
          </div>
          <div class="faq-resposta" style="display:none;">
            ${item.resposta}
          </div>
        </div>
      `;
    });

    faqHtml += '</div></div></section>';

    $('#rodape').before(faqHtml);

    $(document).on('click', '.faq-pergunta', function () {
      const item = $(this).closest('.faq-item');
      $('.faq-item').not(item).removeClass('active').find('.faq-resposta').slideUp(250);
      $('.faq-item').not(item).find('.faq-icon').text('+');

      item.toggleClass('active');
      item.find('.faq-resposta').slideToggle(250);
      item.find('.faq-icon').text(item.hasClass('active') ? '−' : '+');
    });
  }

  // ========================================
  // 10. BENEFÍCIOS (Dados do cliente)
  // ========================================
  renderBenefits() {
    if (!this.config.benefits || this.config.benefits.length === 0) return;

    let itensHTML = '';

    this.config.benefits.forEach((item, index) => {
      itensHTML += `
        <div class="beneficio-item">
          <div class="beneficio-icone">${item.icone}</div>
          <div class="beneficio-texto">
            <strong>${item.titulo}</strong>
            <span>${item.texto}</span>
          </div>
        </div>
      `;

      if (index < this.config.benefits.length - 1) {
        itensHTML += '<div class="beneficio-divider"></div>';
      }
    });

    const barraBeneficios = `
      <section class="barra-beneficios">
        <div class="beneficios-container">
          ${itensHTML}
        </div>
      </section>
    `;

    if ($('#barraNewsletter').length) {
      $('#barraNewsletter').before(barraBeneficios);
    } else {
      $('#rodape').before(barraBeneficios);
    }
  }

  // ========================================
  // 11. AJUSTE DE IMAGENS
  // ========================================
  adjustImages() {
    if ($(window).width() <= 768) return;

    $('.listagem .imagem-produto img').each(function () {
      const $img = $(this);
      const src = $img.attr('src');
      if (!src) return;

      let newSrc = src.replace('/300x300/', '/512x512/');
      if (newSrc !== src) {
        $img.attr('src', newSrc);
        if ($img.attr('data-src')) {
          $img.attr('data-src', newSrc);
        }
      }
    });

    $('.mini-banner img').each(function () {
      const $img = $(this);
      const src = $img.attr('src');
      if (!src) return;

      let newSrc = src.replace('/400x400/', '/800x800/');
      if (newSrc !== src) {
        $img.attr('src', newSrc);
        if ($img.attr('data-src')) {
          $img.attr('data-src', newSrc);
        }
      }
    });

    $('.pagina-produto .miniaturas img').each(function () {
      const $img = $(this);
      const src = $img.attr('src');
      if (!src) return;

      let newSrc = src.replace('/64x50/', '/100x100/');
      if (newSrc !== src) {
        $img.attr('src', newSrc);
        if ($img.attr('data-src')) {
          $img.attr('data-src', newSrc);
        }
        if ($img.attr('data-mediumimg')) {
          $img.attr('data-mediumimg', $img.attr('data-mediumimg').replace('/64x50/', '/100x100/'));
        }
        if ($img.attr('data-largeimg')) {
          $img.attr('data-largeimg', $img.attr('data-largeimg').replace('/64x50/', '/100x100/'));
        }
      }
    });

    $(window).on('load', function () {
      $('.compre-junto__imagem img').each(function () {
        const $img = $(this);
        const src = $img.attr('src');
        if (!src) return;

        let newSrc = src.replace('/150x150/', '/300x300/');
        if (newSrc !== src) {
          $img.attr('src', newSrc);
          if ($img.attr('data-src')) {
            $img.attr('data-src', newSrc);
          }
        }
      });
    });
  }

  // ========================================
  // 12. RESPONSIVO
  // ========================================
  setupResponsive() {
    if ($(window).width() > 768) {
      $('.conteudo-topo .inferior').prepend($('.menu.superior'));
      $('.produto').children().not('.row-fluid:first').appendTo('.conteiner-imagem');
    } else {
      const closeIcon = this.coreConfig.icons.mobileCloseIcon;
      $('.menu.superior').append(`<div class="close-menu"><img src="${closeIcon}" alt="fechar"/></div>`);

      $(document).on('click', '.close-menu', function () {
        $('.menu.superior .nivel-um.active').removeClass('active');
      });

      $(document).on('click', '.h-menu', function () {
        $('.menu.superior .nivel-um').addClass('active');
      });

      $(document).on('click', '.h-search', function () {
        $('.conteudo-topo > .inferior').toggleClass('active');
      });

      $('.h-menu').before($('#cabecalho .conteudo-topo .inferior .span4.hidden-phone > .carrinho'));

      const botaoComprar = document.querySelector('.produto .acoes-produto .comprar');
      if (botaoComprar) {
        const sentinel = document.createElement('div');
        sentinel.style.height = '1px';
        botaoComprar.parentNode.insertBefore(sentinel, botaoComprar);

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) {
              botaoComprar.classList.add('comprar-fixo');
            } else {
              botaoComprar.classList.remove('comprar-fixo');
            }
          });
        }, { root: null, threshold: 0 });

        observer.observe(sentinel);
      }
    }
  }

  // ========================================
  // 13. HELPERS
  // ========================================
  initSlider(selector, options) {
    const $slider = $(selector);
    if (!$slider.hasClass('slick-initialized')) {
      $slider.slick(options);
    }
  }
}

// Inicializa o engine
window.themeEngine = null;

function initTheme(config) {
  window.themeEngine = new ThemeEngine(config);
}
