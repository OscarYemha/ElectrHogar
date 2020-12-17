const {Product, Category, User} = require('./api/Models/index');
const db = require('./api/db/db');
const Sequelize = require('sequelize');

const televisor1 = Product.create({
    name: 'Televisor Smart Full HD Samsung 43',
    price: 39999.00,
    imgUrl: 'https://images.samsung.com/is/image/samsung/ar-fhdtv-j5290-un43j5290agxzb-frontblack-thumb-134308813',
    stock: 10,
    description: `El smart TV Samsung 43" serie J5290 cuenta con una pantalla de visualización widescreen (16:9) con resolución Full HD (1920 x 1080 píxeles) que brinda una gran calidad de imagen y contraste. A diferencia de otras TV convencionales, su tecnología Wide Colour Enhancer mejora la calidad de las imágenes mediante un algoritmo avanzado devolviendo colores más reales.
    Mediante sus entradas HDMI podés vincular reproductores de audio y video; consolas de juegos y notebooks. Su gran capacidad de transmisión de datos permite disfrutar de imágenes en alta definición y un sonido de gran fidelidad.
    Por otro lado, gracias a su puerto ConnectShare (USB 2.0) podés disfrutar al instante de películas, música e imágenes almacenadas en tus dispositivos externos como tablets, smartphones o pendrives.
    Gracias a posee Wi- Fi incorporado vas a poder acceder a internet de forma inalámbrica o bien, a través de cable de red mediante su puerto LAN. Navegá por la web y disfrutá de aplicaciones como Netflix, Facebook y Twitter, entre otras.
    Gracias a su sintonizador digital incorporado, vas a poder acceder a esta plataforma de canales en resolución HD de manera gratuita. Paka Paka, Encuentro, C5N y la TV Pública son algunas de las señales del paquete de distribución nacional disponibles con este servicio.`
});


const televisor2 = Product.create({
    name: 'Televisor Smart Full HD Phillips 43',
    price: 39999.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_771965-MLA31522492188_072019-O.webp',
    stock: 10,
    description: `El compromiso de Philips es brindar nuevas e innovadoras tecnologías a sus usuarios. Es por esa razón que se centra en los detalles para poder ofrecer productos que marcan la diferencia y crean una experiencia visual más increíble y auténtica.
    Con el Smart TV 43PFG5813 vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos.
    Sumergite en la pantalla
    Su resolución Full HD muestra una clara evolución frente a su antecesora. Las imágenes que vas a ver van a tener una calidad superior con un alto nivel de detalle y colores mucho más llamativos.
    Un sonido que te envuelve
    Vas a sentir que proviene desde todas las direcciones posibles, lo cual enriquece la percepción del mismo. Los diálogos de tus series de fin de semana o la música de tus cantantes preferidos van a cobrar otro significado.`
});


const televisor3 = Product.create({
    name: 'Televisor Smart HD Noblex 32',
    price: 25699.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_717601-MLA32070794378_092019-O.webp',
    stock: 10,
    description: `Noblex lleva más de 70 años creando bienestar en los hogares argentinos, lo que la convierte en una de las marcas con mayor historia y trayectoria del país. Ofrece una amplia gama de productos comprometidos con la calidad y la innovación tecnológica.
    Con el Smart TV DJ32X5000 vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos.
    Sumergite en la pantalla
    Su resolución HD presenta imágenes con gran detalle y alta definición. Ahora todo lo que veas cobrará vida con brillo y colores más reales.
    Un sonido que te envuelve
    Vas a sentir que proviene desde todas las direcciones posibles, lo cual enriquece la percepción del mismo. Los diálogos de tus series de fin de semana o la música de tus cantantes preferidos van a cobrar otro significado.`
});


const televisor4 = Product.create({
    name: 'Televisor Smart 4K TCL 50',
    price: 48999.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_862772-MLA40527019658_012020-O.webp',
    stock: 10,
    description: `TCL es una de las empresas líderes en la industria global de televisores, dedicada a la investigación y desarrollo de productos electrónicos. Orientada a la satisfacción de sus clientes, se distingue por proveer una excelente experiencia a quienes adquieran y usen sus diferentes líneas de electrodomésticos.
    Con el Smart TV L50P8M vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos.
    Viví en 4K
    La cantidad de pixeles que ofrece es 4 veces mayor que la Full HD, ¿el resultado? Escenas mucho más realistas y con un nivel de detalle increíble. Ahora vas a conocer una aventura de inmersión que no va a dejar de sorprenderte.
    Un sonido que te envuelve
    Vas a sentir que proviene desde todas las direcciones posibles, lo cual enriquece la percepción del mismo. Los diálogos de tus series de fin de semana o la música de tus cantantes preferidos van a cobrar otro significado.`
});


const heladera1 = Product.create({
    name: 'Heladera Patrick HPK135 blanca con freezer 264L',
    price: 37200.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_965028-MLA32542008594_102019-O.webp',
    stock: 10,
    description: `Con más de 70 años en el mercado, Patrick es una marca especializada en productos de línea blanca. Sus heladeras están diseñadas para brindar una solución para cada hogar, ¡contá con Patrick!
    Comodidad para tu casa
    Su sistema cycle defrost te va a permitir mantener la humedad natural de los productos por más tiempo.
    Frescura en tus alimentos
    Los 7 niveles de temperatura ayudarán a conservar tus alimentos de acuerdo a tus necesidades y preferencias. Cada vez que abrís la puerta se cuela aire caliente; por eso, al tener control de temperatura vas a poder regular los grados para que tus productos se mantengan siempre frescos.
    Eficiencia energética y utilidad
    Gracias a su eficiencia energética A, vas a ahorrar en la economía de tu hogar y aprovechar al máximo su rendimiento, ya que cuenta con un 45% de ahorro de consumo.
    Practicidad interior
    La disposición de 3 estantes te va a proporcionar un gran ahorro de espacio y fácil localización de tus productos. Asimismo, su freezer ubicado en la parte superior cuenta con 1 estante y una capacidad de 68 litros, que te va a facilitar la distribución y el orden de tus congelados.`
});


const heladera2 = Product.create({
    name: 'Heladera Gafa HGF357AF blanca con freezer 282L',
    price: 41499.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_852497-MLA32566609369_102019-O.webp',
    stock: 10,
    description: `Disfrutá de tus alimentos frescos y almacenalos de manera práctica y cómoda en tu heladera Gafa, la protagonista de tu cocina.
    Comodidad para tu casa
    Su sistema cycle defrost te va a permitir mantener la humedad natural de los productos por más tiempo.
    Frescura en tus alimentos
    Cada vez que abrís la puerta se cuela aire caliente; por eso, al tener control de temperatura vas a poder regular los grados para que tus productos se mantengan siempre frescos.
    Eficiencia energética y utilidad
    Gracias a su eficiencia energética A, vas a ahorrar en la economía de tu hogar y aprovechar al máximo su rendimiento, ya que cuenta con un 45% de ahorro de consumo.
    Practicidad interior
    La disposición de 2 estantes te va a proporcionar un gran ahorro de espacio y fácil localización de tus productos. Asimismo, su freezer ubicado en la parte superior cuenta con 1 estante y una capacidad de 76 litros, que te va a facilitar la distribución y el orden de tus congelados.`
});


const heladera3 = Product.create({
    name: 'Heladera Patrick HOK141M10 con freezer 355L',
    price: 49599.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_684212-MLA40493211450_012020-O.webp',
    stock: 10,
    description: `Con más de 70 años en el mercado, Patrick es una marca especializada en productos de línea blanca. Sus heladeras están diseñadas para brindar una solución para cada hogar, ¡contá con Patrick!
    Comodidad para tu casa
    Su sistema cycle defrost te va a permitir mantener la humedad natural de los productos por más tiempo.
    Frescura en tus alimentos
    Cada vez que abrís la puerta se cuela aire caliente; por eso, al tener control de temperatura vas a poder regular los grados para que tus productos se mantengan siempre frescos.
    Eficiencia energética y utilidad
    Gracias a su eficiencia energética A, vas a ahorrar en la economía de tu hogar y aprovechar al máximo su rendimiento, ya que cuenta con un 45% de ahorro de consumo. Además, con su dispenser de agua vas a poder refrescarte rápidamente sin tener que abrirla.  
    Practicidad interior
    La disposición de 3 estantes te va a proporcionar un gran ahorro de espacio y fácil localización de tus productos. Gracias a su resistente material no vas a tener que preocuparte por el peso que deposites en ellos y organizarás a tu gusto cada rincón para optimizar su uso. Asimismo, su freezer ubicado en la parte superior cuenta con 1 estante y una capacidad de 91 litros, que te va a facilitar la distribución y el orden de tus congelados.`
});


const heladera4 = Product.create({
    name: 'Heladera no frost Whirpool WRM45A inox con freezer 375L',
    price: 80400.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_684212-MLA40493211450_012020-O.webp',
    stock: 10,
    description: `Con más de 100 años de experiencia en electrodomésticos, para Whirlpool cada detalle cuenta. Por eso, sus heladeras combinan almacenamiento y diseño. Pero no solo están pensadas para simplificar tu vida, también están desarrolladas para reducir al mínimo el impacto en el ambiente.
    Comodidad para tu casa
    Su sistema no frost evita la generación de escarcha y te va a permitir conservar el sabor y las propiedades nutritivas de los productos.
    Frescura en tus alimentos
    Los 5 niveles de temperatura ayudarán a conservar tus alimentos de acuerdo a tus necesidades y preferencias. Cada vez que abrís la puerta se cuela aire caliente; por eso, al tener control de temperatura vas a poder regular los grados para que tus productos se mantengan siempre frescos.
    Eficiencia energética y utilidad
    Gracias a su eficiencia energética A, vas a ahorrar en la economía de tu hogar y aprovechar al máximo su rendimiento, ya que cuenta con un 45% de ahorro de consumo. En caso de que tu heladera quede abierta, su alarma te avisará para que no pierda su frescura.
    Practicidad interior
    La disposición de 3 estantes te va a proporcionar un gran ahorro de espacio y fácil localización de tus productos. Gracias a su resistente material no vas a tener que preocuparte por el peso que deposites en ellos y organizarás a tu gusto cada rincón para optimizar su uso.`
});


const lavarropas1 = Product.create({
    name: 'Lavarropas automático Drean Next 6.06 ECO blanco 6kg',
    price: 32500.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_652305-MLA43406873008_092020-O.webp',
    stock: 10,
    description: `Desde su lanzamiento al mercado en la década del 40, Drean permanece en la memoria de los argentinos como una marca de electrodomésticos confiables, modernos y accesibles. Toda su gama de productos confirma su compromiso de brindarte más tiempo libre y de contribuir a lograr un planeta más limpio.
    Tecnología para tu hogar
    Su panel está idealmente diseñado para brindarte una operación más cómoda y funcional. El display LED integrado te permite visualizar el tiempo necesario para la finalización del lavado de tus prendas.
    Mejor calidad de lavado
    El filtro atrapa pelusas mejora la eficacia del lavado, ayudando a mantener la calidad de tu ropa.`
});


const lavarropas2 = Product.create({
    name: 'Lavarropas automático Samsung WW70J4463G inverter plata 7kg',
    price: 53900.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_928693-MLA32507748170_102019-O.webp',
    stock: 10,
    description: `Samsung apuesta por la innovación y el diseño de vanguardia en los productos de su línea blanca. Ofrece soluciones para el lavado que priorizan la eficiencia de cada uno de sus programas y con ello, el cuidado de tus prendas más delicadas.
    Tecnología para tu hogar
    Su panel está idealmente diseñado para brindarte una operación más cómoda y funcional. El display LED integrado te permite visualizar el tiempo necesario para la finalización del lavado de tus prendas. 
    Mejor calidad de lavado
    El filtro atrapa pelusas mejora la eficacia del lavado, ayudando a mantener la calidad de tu ropa.`
});


const lavarropas3 = Product.create({
    name: 'Lavasecarropas automático Candy Alisè GVSW286 blanco 8kg',
    price: 59399.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_843250-MLA41782479284_052020-O.webp',
    stock: 10,
    description: `Gracias a su diseño innovador, este lavasecarropas Candy te ofrece gran comodidad y un uso eficaz. Su doble función permite que ahorres tiempo y espacio.
    Tecnología para tu hogar
    Su panel está idealmente diseñado para brindarte una operación más cómoda y funcional. El display LCD integrado te permite visualizar el tiempo necesario para la finalización del lavado de tus prendas. Su práctica pantalla táctil con botones suaves hace que la configuración del programa de lavado sea muy fácil de manejar. Elegí el tipo de lavado y la duración desde tu celular. Programalo para que funcione cuando no estés en casa.
    Mejor calidad de lavado
    Mantené tu ropa como nueva. Gracias al regulador de velocidad de centrifugado olvidate de las manchas y de prendas arruinadas después del lavado. El filtro atrapa pelusas mejora la eficacia del lavado, ayudando a mantener la calidad de tu ropa.`
});


const lavarropas4 = Product.create({
    name: 'Lavarropas semiautomático Drean Family 096 A blanco 5.5kg',
    price: 17499.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_683780-MLA43406417959_092020-O.webp',
    stock: 10,
    description: `Desde su lanzamiento al mercado en la década del 40, Drean permanece en la memoria de los argentinos como una marca de electrodomésticos confiables, modernos y accesibles. Toda su gama de productos confirma su compromiso de brindarte más tiempo libre y de contribuir a lograr un planeta más limpio.
    Mejor calidad de lavado
    El filtro atrapa pelusas mejora la eficacia del lavado, ayudando a mantener la calidad de tu ropa.`
});


const notebook1 = Product.create({
    name: 'Notebook Lenovo V130 Intel N4000 4gb 1tb 15.6 Pulgadas',
    price: 48999.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_961352-MLA42764591253_072020-O.webp',
    stock: 10,
    description: `NOTEBOOK LENOVO V130 N4000/4GB/1TB/DOS/DVDRW/15.6" (81HL004FAK)

    La computadora portátil V130 de 15.6 " ofrece un gran rendimiento en una cubierta estampada y texturizada que muestra un estilo moderno. Un diseño simple y limpio presenta un panel táctil grande de una pieza y bisagras que se abren 180 grados, perfecto para colaborar. La potente tecnología Intel® lo mantiene trabajando productivamente, mientras que la seguridad mejorada protege sus datos críticos.
    El teclado ergonómico de tamaño completo en el V130 fue diseñado para la comodidad y la precisión de escritura
    Nuestras computadoras portátiles de la serie V se someten a controles de confiabilidad y durabilidad para garantizar que funcionen sin problemas
    
    Modelo 81HL004FAK
    Producto Lenovo V130
    Procesador Intel Celeron N4000
    Memoria DDR4 de 4GB
    Monitor 15.6 " HD (1366 × 768) TN 220nits Antideslumbrante
    Tactil NO
    Almacenamiento 1 TB HDD
    Teclado Inglés, sin retroiluminación
    Sistema operativo No incluido
    DVDRW Si`
});


const notebook2 = Product.create({
    name: 'Notebook Dell Intel I3 1005g1 4gb 1tb 15.6 Vostro 3591',
    price: 74999.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_891515-MLA43116996371_082020-O.webp',
    stock: 10,
    description: `NOTEBOOK DELL VOSTRO 3591 I3 1005G1/4GB/1TB/15.6"/FREEDOS
    Teclado inglés
    
    PROCESADOR: INTEL I3-1005G1
    VELOCIDAD DEL PROCESADOR: 1.20 GHZ
    PROCESADOR MAX. VELOCIDAD: 3.40 GHZ
    PROCESADOR TIPO MULTICORE: 2 NÚCLEOS / 4 HILOS
    Memoria RAM: 4 GB
    Disco rigido: 1 TB 5400 RPM HDD
    TAMAÑO DE LA PANTALLA: 15,6
    RESOLUCIÓN DE PANTALLA: 1366 X 768
    802.11AC 1X1 WIFI Y BLUETOOTH 4.1
    DVDRW
    Sistema operativo: No incluido`
});


const notebook3 = Product.create({
    name: 'Notebook Gadnic Glow Cloudbook Intel 4gb Windows 10 + Funda',
    price: 36999.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_986470-MLA43608468422_092020-O.webp',
    stock: 10,
    description: `Notebook Gadnic 14,1” 4GB 64GB SSD Windows 10

    ACERCA DE ÉSTE PRODUCTO:
    
    ¡Descubrí esta alternativa a la Notebook tradicional! La cloudbook Gadnic NOT000A3 con procesador Intel Celeron N3350 (1.10Ghz), memoria Ram de 4 GB y capacidad 64GB es ideal para realizar tus tareas de todos los días.
    Su pantalla de 14 pulgadas y resolución Full HD: 1366 x 768 hace que sea tu mejor compañera para conectarla a la TV vía Mini HDMI y stremear tus series y películas favoritas.
    No necesitás una notebook gamer con esta laptop, podés jugar juegos online y vía servicios de streaming sin sobre exigir los componentes.
    Cuenta con el sistema operativo Windows 10 Home Edition instalado, cámara frontal y WIFI integrado para que conectes desde dónde quieras.
    
    ////////////////////////////////////////////////////////////////
    
    CARACTERÍSTICAS:
    
    
    - VENTAJAS Y BENEFICIOS
    
    - Ideal para uso academico, tareas basicas, trabajo y tareas a nivel general, uso multimedia basico.
    - Sistema operativo Windows 10 ya instalado, equipo listo para usar.
    - Ultra delgada y liviana, llevala con vos donde sea.+

    - CARACTERISTICAS
    
    - Procesador Intel Celeron N3350 (1.10Ghz)
    - Memoria Ram: 4 GB
    - Capacidad de disco interno 64GB
    - Sistema operativo instalado Windows 10 Home Edition
    - Pantalla de 14 pulgadas
    - Resolución de pantalla: 1366 x 768 HD
    - Bluetooth 4.0 para conexiones con otros dispositivos
    - Cámara frontal integrada
    - Wifi Integrado, para conexiones inalambricas
    - Ultraliviana, pesa solo 1.2KG
    - Puertos: 2 Usb, 1 Mini HDMI, 1 Auriculares , 1 Slot de micro SD
    
    - ACCESORIOS DE REGALO
    
    - Funda Protectora de Neoprene con cierre
    - Auriculares Gadnic
    - Mouse Inalámbrico Gadnic
    
    - PUERTOS PARA CONEXIONES
    
    - 2 USB para conectar tus dispositivos
    - 1 salida Mini HDMI
    - 1 puerto 3.5 mm para Auriculares
    - 1 Slot de memoria micro SD para ampliar memoria interna
    
    
    SE ENTREGA CON:
    
    
    - Notebook Gadnic NOT000A3
    - Funda Protectora de neoprene Gadnic
    - Auriculares con micrófono Gadnic
    - Mouse Gadnic - Blanco
    - Cargador original homologado 220V
    - Packaging Original GADNIC`
});


const notebook4 = Product.create({
    name: 'Notebook Acer Intel Core I5 10ma 8gb 256gb Ssd 15,6 Win10',
    price: 125999.00,
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_821866-MLA43817606682_102020-O.webp',
    stock: 10,
    description: `Notebook Acer Aspire 3 Intel Core i5 8gb 256gb Ssd 15,6 Win10
    
    Especificaciones:
    
    -Capacidad Memoria RAM: 8 GB
    -Procesador: Intel
    -Wi-Fi: Sí
    -Tamaño de Pantalla: 15.6 Pulgadas
    -Largo del Producto Armado: 34.00 cm
    -Altura del Producto Armado: 26.00 cm
    -Ancho del Producto Armado: 16.00 cm
    -Procesador Intel Core i5
    -Modelo Marca: Acer Serie: Aspire 3
    -Modelo: A315-56-594W
    -Número de parte: NX.A0TAA.005
    -Intel Línea: Core i5
    -Modelo: 1035G1
    -Generación: 10ma Generación
    -Velocidad: (hasta 3.60 GHz)`
});


const category1 = Category.create({ 
    name: "Televisores",
    imgUrl: "https://cdn1.coppel.com/images/catalog/pm/2989433-1.jpg",
});
const category2 = Category.create({ 
    name: "Heladeras",
    imgUrl: "https://www.sumaelectrohogar.com.ar/752-thickbox_default/heladera-patrick-hpk-135-bl-01.jpg",
});
const category3 = Category.create({ 
    name: "Lavarropas",
    imgUrl: "https://www.carrefour.com.ar/media/catalog/product/7/7/7797075017158_05.jpg", 
});
const category4 = Category.create({ 
    name: "Notebooks",
    imgUrl: "https://s3-sa-east-1.amazonaws.com/saasargentina/nX5CbDcKZ8sZtwsUeFJq/imagen",
});


Promise.all([televisor1, category1]).then(([tv1, c1]) => {
    tv1.addCategory([c1]);
});

Promise.all([televisor2, category1]).then(([tv2, c1]) => {
    tv2.addCategory([c1]);
});

Promise.all([televisor3, category1]).then(([tv3, c1]) => {
    tv3.addCategory([c1]);
});

Promise.all([televisor4, category1]).then(([tv4, c1]) => {
    tv4.addCategory([c1]);
});

Promise.all([heladera1, category2]).then(([hl1, c2]) => {
    hl1.addCategory([c2]);
});

Promise.all([heladera2, category2]).then(([hl2, c2]) => {
    hl2.addCategory([c2]);
});

Promise.all([heladera3, category2]).then(([hl3, c2]) => {
    hl3.addCategory([c2]);
});

Promise.all([heladera4, category2]).then(([hl4, c2]) => {
    hl4.addCategory([c2]);
});

Promise.all([lavarropas1, category3]).then(([lr1, c3]) => {
    lr1.addCategory([c3]);
});

Promise.all([lavarropas2, category3]).then(([lr2, c3]) => {
    lr2.addCategory([c3]);
});

Promise.all([lavarropas3, category3]).then(([lr3, c3]) => {
    lr3.addCategory([c3]);
});

Promise.all([lavarropas4, category3]).then(([lr4, c3]) => {
    lr4.addCategory([c3]);
});

Promise.all([notebook1, category4]).then(([nb1, c4]) => {
    nb1.addCategory([c4]);
});

Promise.all([notebook2, category4]).then(([nb2, c4]) => {
    nb2.addCategory([c4]);
});

Promise.all([notebook3, category4]).then(([nb3, c4]) => {
    nb3.addCategory([c4]);
});

Promise.all([notebook4, category4]).then(([nb4, c4]) => {
    nb4.addCategory([c4]);
});


User.create({
    firstName: "Administrador",
    lastName: "Administrador",
    email: "soy@admin.com",
    password: "123",
    isAdmin: true,
});