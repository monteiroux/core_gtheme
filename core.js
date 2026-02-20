class ThemeEngine {
  constructor(config) {
      this.config = config;
      this.authorized = false;
  }

  static AUTHORIZED_DOMAINS_MAP = {
      'theme-gift': [
          'demo-gametheme2.lojaintegrada.com.br'
      ]
  };

  validateDomain() {
      const clientId = window.THEME_CLIENT_ID;
      if (!clientId) {
          console.error('❌ ThemeEngine: ID do cliente não definido.');
          return false;
      }

      const authorizedDomains = ThemeEngine.AUTHORIZED_DOMAINS_MAP[clientId];
      if (!authorizedDomains || authorizedDomains.length === 0) {
          console.error(`❌ ThemeEngine: Nenhum domínio autorizado configurado para o cliente "${clientId}".`);
          return false;
      }

      const currentDomain = window.location.hostname;
      const isAuthorized = authorizedDomains.some(domain => {
          const escapedDomain = domain.replace(/\./g, '\\.').replace(/\*/g, '.*');
          const pattern = new RegExp('^' + escapedDomain + '$');
          return pattern.test(currentDomain);
      });

      if (!isAuthorized) {
          console.error(`❌ Domínio não autorizado: ${currentDomain}`);
          console.warn(`Domínios permitidos para "${clientId}":`, authorizedDomains);
          return false;
      }

      console.log(`✅ Domínio autorizado: ${currentDomain}`);
      this.authorized = true;
      return true;
  }

  init() {
      if (!this.authorized) {
          console.error("❌ ThemeEngine: A inicialização foi bloqueada porque o domínio não é autorizado.");
          return;
      }

      $(document).ready(() => {
          this.setupGeneralAdjustments();
          this.setupWhatsappDropdown();
          this.setupFooter();
          this.setupCategorySlider();
          this.setupProductSlider();
          this.setupPaymentModal();
          this.setupCategoryPage();
          this.setupVideoSlider();
          this.setupFaq();
          this.setupBenefitsBar();
          this.setupDiscountFlags();
          this.setupResponsiveAdjustments();
      });
  }

  setupGeneralAdjustments() {
      $('#cabecalho .span8.busca-mobile').after(`
          <div class="h-actions hidden-phone">
              <a href="/conta/login" class="h-user">
                  <img src="https://cdn.awsli.com.br/2923/2923109/arquivos/user.svg" alt="Minha conta">
                  <span>Entrar</span>
              </a>
          </div>
      `);

      $('#cabecalho .conteudo-topo .inferior').after(`
          <div class="h-actions visible-phone">
              <a href="/conta/login" class="h-user">
                  <img src="https://cdn.awsli.com.br/2923/2923109/arquivos/user.svg" alt="Minha conta">
                  <span>Entrar</span>
              </a>
              <div class="h-search visible-phone">
                  <img src="https://cdn.awsli.com.br/2923/2923109/arquivos/search.svg" alt="Buscar">
              </div>
              <div class="h-menu visible-phone">
                  <img src="https://cdn.awsli.com.br/2923/2923109/arquivos/menu.svg" alt="Menu">
              </div>
          </div>
      `);

      $('.banner.cheio .flex-direction-nav').prepend($('.banner.cheio .flex-control-nav'));
      $('.selos li:first-child img').attr('src', 'https://cdn.awsli.com.br/2830/2830294/arquivos/site-protegido.svg');
      $('#rodape>div:last-child .conteiner .row-fluid div:not(.span12)').before(`<div class="feito-pixelset"><a href="https://www.pixelset.com.br/" class="pixel-logo" target="_blank"><img src="https://pages.greatpages.com.br/www.pixelset.com.br/1768577291/imagens/desktop/3485744_1_176857398507036064.svg" alt="Pixelset"></a></div>`);
      $('#rodape>div:last-child .row-fluid > div:last-child').attr('style', '');
  }

  setupWhatsappDropdown() {
      const { whatsappNumbers } = this.config;
      if (!whatsappNumbers || whatsappNumbers.length === 0) return;

      const whatsappDropdownHtml = `
          <div class="whatsapp-dropdown">
              <button class="whatsapp-btn" type="button">
                  <i class="fa fa-whatsapp"></i> Fale conosco pelo WhatsApp
              </button>
              <ul class="whatsapp-dropdown-menu" style="display: none;">
                  ${whatsappNumbers.map(num => `
                      <li>
                          <strong>${num.title}:</strong> <a href="https://wa.me/${num.phone}" target="_blank">${num.display}</a>
                      </li>
                  `).join('')}
              </ul>
          </div>
      `;

      $('#rodape .institucional .lista-redes').after(whatsappDropdownHtml);

      $(document).on('click', '.whatsapp-btn', function () {
          const $dropdown = $(this).closest('.whatsapp-dropdown');
          $dropdown.toggleClass('open');
          const $menu = $dropdown.find('.whatsapp-dropdown-menu');
          $menu.slideToggle(150);
      });
  }

  setupFooter() {
      const { atendimento } = this.config;
      if (!atendimento) return;

      const atendimentoHtml = `
          <div class="span4 atendimento-rodape">
              <span class="titulo">${atendimento.titulo}</span>
              <ul>
                  ${atendimento.horarios.map(h => `<li>${h}</li>`).join('')}
                  <li style="margin-top:10px;">
                      <img src="${atendimento.whatsapp.icon}" alt="${atendimento.whatsapp.alt}" style="vertical-align:middle; width:20px; margin-right:8px;">
                      ${atendimento.whatsapp.number}
                  </li>
                  <li style="margin-top:5px;">
                      <img src="${atendimento.email.icon}" alt="${atendimento.email.alt}" style="vertical-align:middle; width:20px; margin-right:8px;">
                      <a href="mailto:${atendimento.email.address}" style="color:inherit; text-decoration:none;">${atendimento.email.address}</a>
                  </li>
              </ul>
          </div>
      `;

      $('#rodape .sobre-loja-rodape').replaceWith(atendimentoHtml);
  }

  setupCategorySlider() {
      const { categorias } = this.config;
      if (!categorias || categorias.length === 0) return;

      const categoriaLis = categorias.map(c => `
          <li class="c-item">
              <a href="${c.link}">
                  <img src="${c.img}" alt="${c.alt}">
              </a>
          </li>
      `).join('');

      $('.pagina-inicial #listagemProdutos').before(`
          <div class="c-slide-section">
              <div class="c-slide-header">
                  <h2 class="c-slide-title">Navegue por categoria</h2>
                  <p class="c-slide-subtitle">Escolha abaixo uma categoria para explorar nossos jogos</p>
              </div>
              <ul class="c-slide">${categoriaLis}</ul>
          </div>
      `);

      $('.c-slide').slick({
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          infinite: true,
          responsive: [{
              breakpoint: 768,
              settings: { slidesToShow: 2 }
          }]
      });
  }

  setupProductSlider() {
      $('#listagemProdutos .listagem-linha .flex-viewport').css({ overflow: 'visible' });
      $('#listagemProdutos .listagem-linha.flexslider').removeClass('flexslider');
      const $carousel = $('#listagemProdutos .produtos-carrossel');

      if (!$carousel.hasClass('slick-initialized')) {
          $carousel.removeAttr('style').find('li').removeAttr('style');
          $carousel.slick({
              slidesToShow: 5,
              slidesToScroll: 1,
              infinite: false,
              arrows: true,
              dots: false,
              speed: 400,
              draggable: true,
              adaptiveHeight: false,
              responsive: [{
                  breakpoint: 768,
                  settings: { slidesToShow: 2 }
              }]
          });
      }
  }

  setupPaymentModal() {
      $('.info-principal-produto').after('<button class="btn-forma-pagamento">Forma de pagamento</button>');
      $('body').append(`
          <div id="modal-pagamento">
              <div class="modal-conteudo">
                  <div class="modal-header">
                      <h3>Formas de pagamento</h3>
                      <button class="fechar-modal">✕</button>
                  </div>
              </div>
          </div>
      `);
      $('.parcelas-produto').appendTo('#modal-pagamento .modal-conteudo');
      $(document).on('click', '.btn-forma-pagamento, .fechar-modal, #modal-overlay', function (e) {
          if ($(e.target).is('.btn-forma-pagamento')) {
              $('#modal-overlay, #modal-pagamento').addClass('ativo');
          } else {
              $('#modal-overlay, #modal-pagamento').removeClass('ativo');
          }
      });
  }

  setupCategoryPage() {
      $('.produto .conteiner-imagem #abreZoom').remove();
      $('.pagina-categoria .conteudo > .titulo').prepend($('.pagina-categoria .breadcrumbs'));
      $('.ordenar-listagem.topo > .row-fluid').prepend($('.pagina-categoria .conteudo > .titulo'));
      $('.ordenar-listagem .row-fluid > .span6').removeClass('span6');

      $('.ordenar-listagem.topo .row-fluid').append(`
          <button class="btn btn-filtrar" data-toggle="modal" data-target="#modalFiltros">Filtrar</button>
      `);

      $('body').append(`
          <div id="modalFiltros" class="modal fade" tabindex="-1" style="display: none;">
              <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h4 class="modal-title">Filtros</h4>
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div>
                      <div class="modal-body">
                          <div class="modal-ordenar"><h4>Ordenar por:</h4></div>
                          <div class="modal-filtros"></div>
                      </div>
                  </div>
              </div>
          </div>
      `);

      $('.ordenar-listagem.topo .dropdown-menu').appendTo('#modalFiltros .modal-ordenar');
      $('.filtro-coluna').appendTo('#modalFiltros .modal-filtros');
  }

  setupVideoSlider() {
      const { videosShorts } = this.config;
      if (!videosShorts || videosShorts.length === 0) return;

      const slides = videosShorts.map(id => `
          <div class="depoimento-item">
              <div class="video-wrapper">
                  <iframe src="https://www.youtube.com/embed/${id}?enablejsapi=1&controls=0&rel=0&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </div>
          </div>
      `).join('');

      const htmlSlider = `
          <section class="depoimentos-video">
              <div class="container">
                  <h2>Depoimentos em vídeo</h2>
                  <p>Veja o que nossos clientes estão falando dos produtos.</p>
                  <div class="slider-depoimentos">${slides}</div>
              </div>
          </section>
      `;

      $('.pagina-inicial .vitrine-lancamento+ul').after(htmlSlider);

      $('.slider-depoimentos').slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          infinite: true,
          adaptiveHeight: false,
          responsive: [{
              breakpoint: 768,
              settings: { slidesToShow: 2 }
          }]
      });

      $('.slider-depoimentos').on('beforeChange', function () {
          $('.slider-depoimentos iframe').each(function () {
              this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          });
      });
  }

  setupFaq() {
      const { faqItems } = this.config;
      if (!faqItems || faqItems.length === 0) return;

      let faqHTML = `
          <section class="faq-section">
              <div class="faq-container">
                  <h2>FAQ</h2>
                  <p class="faq-subtitle">Dúvidas frequentes</p>
                  <div class="faq-list">
      `;

      faqItems.forEach(item => {
          faqHTML += `
              <div class="faq-item">
                  <div class="faq-pergunta">
                      <span>${item.pergunta}</span>
                      <div class="faq-icon">+</div>
                  </div>
                  <div class="faq-resposta" style="display:none;">${item.resposta}</div>
              </div>
          `;
      });

      faqHTML += `</div></div></section>`;
      $('.pagina-inicial #corpo').after(faqHTML);

      $(document).on('click', '.faq-pergunta', function () {
          const item = $(this).closest('.faq-item');
          $('.faq-item').not(item).removeClass('active').find('.faq-resposta').slideUp(250);
          $('.faq-item').not(item).find('.faq-icon').text('+');
          item.toggleClass('active');
          item.find('.faq-resposta').slideToggle(250);
          item.find('.faq-icon').text(item.hasClass('active') ? '−' : '+');
      });
  }

  setupBenefitsBar() {
      const { beneficios } = this.config;
      if (!beneficios || beneficios.length === 0) return;

      let itensHTML = beneficios.map((item, index) => `
          <div class="beneficio-item">
              <div class="beneficio-icone">${item.icone}</div>
              <div class="beneficio-texto">
                  <strong>${item.titulo}</strong>
                  <span>${item.texto}</span>
              </div>
          </div>
          ${index < beneficios.length - 1 ? '<div class="beneficio-divider"></div>' : ''}
      `).join('');

      const barraBeneficios = `
          <section class="barra-beneficios">
              <div class="beneficios-container">${itensHTML}</div>
          </section>
      `;

      if ($('#barraNewsletter').length) {
          $('#barraNewsletter').before(barraBeneficios);
      } else {
          $('#rodape').before(barraBeneficios);
      }
  }

  setupDiscountFlags() {
      $('.bandeiras-produto .bandeira-promocao').each(function () {
          let texto = $(this).text().replace(/desconto/i, '').trim();
          let numero = texto.replace('%', '').trim();
          $(this).text(`-${numero}%`);
      });
  }

  setupResponsiveAdjustments() {
      if ($(window).width() > 768) {
          // Desktop
          $('.conteudo-topo .inferior').prepend($('.menu.superior'));
          $('.produto').children().not('.row-fluid:first').appendTo('.conteiner-imagem');

          // Image resolution adjustments
          const imageSizes = [
              { selector: '.listagem .imagem-produto img', from: '/300x300/', to: '/512x512/' },
              { selector: '.mini-banner img', from: '/400x400/', to: '/800x800/' },
              { selector: '.pagina-produto .miniaturas img', from: '/64x50/', to: '/100x100/' }
          ];

          imageSizes.forEach(s => {
              $(s.selector).each(function () {
                  const $img = $(this);
                  const src = $img.attr('src');
                  if (!src) return;
                  const newSrc = src.replace(s.from, s.to);
                  if (newSrc !== src) {
                      $img.attr('src', newSrc);
                      if ($img.attr('data-src')) $img.attr('data-src', newSrc);
                      if ($img.attr('data-mediumimg')) $img.attr('data-mediumimg', $img.attr('data-mediumimg').replace(s.from, s.to));
                      if ($img.attr('data-largeimg')) $img.attr('data-largeimg', $img.attr('data-largeimg').replace(s.from, s.to));
                  }
              });
          });

          $(window).on('load', () => {
              $('.compre-junto__imagem img').each(function () {
                  const $img = $(this);
                  const src = $img.attr('src');
                  if (!src) return;
                  const newSrc = src.replace('/150x150/', '/300x300/');
                  if (newSrc !== src) {
                      $img.attr('src', newSrc);
                      if ($img.attr('data-src')) $img.attr('data-src', newSrc);
                  }
              });
          });

      } else {
          // Mobile
          $('.menu.superior').append(`<div class="close-menu"><img src="https://cdn.awsli.com.br/2923/2923109/arquivos/close.svg" alt="fechar"/></div>`);
          $(document).on('click', '.close-menu', () => $('.menu.superior .nivel-um.active').removeClass('active'));
          $(document).on('click', '.h-menu', () => $('.menu.superior .nivel-um').addClass('active'));
          $(document).on('click', '.h-search', () => $('.conteudo-topo > .inferior').toggleClass('active'));
          $('.h-menu').before($('#cabecalho .conteudo-topo .inferior .span4.hidden-phone > .carrinho'));

          const botaoComprar = document.querySelector('.produto .acoes-produto .comprar');
          if (!botaoComprar) return;
          const sentinel = document.createElement('div');
          sentinel.style.height = "1px";
          botaoComprar.parentNode.insertBefore(sentinel, botaoComprar);
          const observer = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                  botaoComprar.classList.toggle('comprar-fixo', !entry.isIntersecting);
              });
          }, { root: null, threshold: 0 });
          observer.observe(sentinel);
      }
  }
}

// Função de inicialização segura
function initTheme() {
  if (window.CONFIG && window.THEME_CLIENT_ID) {
      const theme = new ThemeEngine(window.CONFIG);
      if (theme.validateDomain()) {
          theme.init();
      }
  } else {
      // Se o config ainda não carregou, tenta novamente em 100ms
      setTimeout(initTheme, 100);
  }
}

// Inicia o processo
initTheme();