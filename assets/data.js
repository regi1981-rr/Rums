/* Tresalba — site content. Edit products, prices and copy here. */
window.TRESALBA = {
  currency: "EUR",
  shipping: { standard: 6.9, express: 12.9, freeFrom: 80 },

  products: [
    {
      id: "blanco-seco", no: "01", name: "Blanco Seco", style: "White rum",
      age: "3 years, charcoal filtered", abv: 40, size: "70 cl", price: 29,
      img: "assets/img/bottle-blanco.jpg",
      tagline: "Dry, bright and built for the shaker.",
      desc: "Column-distilled from cane molasses, rested three years in used American oak and then filtered through charcoal until the colour falls away and only the texture stays. A dry white rum with real weight.",
      notes: { nose: "Lime zest, green banana, fresh cane", palate: "White pepper, coconut water, almond", finish: "Clean, dry, faintly saline" },
      serve: "Shaken hard in a Daiquiri, or long with soda and lime.",
      cocktail: "daiquiri", tags: ["white", "mixing"]
    },
    {
      id: "dorado-5", no: "02", name: "Dorado 5", style: "Gold rum",
      age: "Solera, up to 5 years", abv: 40, size: "70 cl", price: 36,
      img: "assets/img/bottle-dorado.jpg",
      tagline: "The everyday pour of the house.",
      desc: "A young solera drawn from ex-bourbon barrels. Five years is enough for oak to round the edges and lend honeyed colour without burying the cane underneath.",
      notes: { nose: "Honey, toasted coconut, orange blossom", palate: "Vanilla, ripe pineapple, soft oak", finish: "Warm and gently sweet" },
      serve: "In a Mojito, a highball with ginger ale, or over one cube.",
      cocktail: "mojito", tags: ["gold", "mixing", "sipping"]
    },
    {
      id: "especiado", no: "03", name: "Especiado", style: "Spiced rum",
      age: "Aged rum base, 4 years", abv: 38, size: "70 cl", price: 34,
      img: "assets/img/bottle-especiado.jpg",
      tagline: "Whole spice, steeped slowly, nothing artificial.",
      desc: "Our four-year rum macerated for six weeks with split vanilla pods, Ceylon cinnamon, tonka, cacao husk and dried orange peel. Lightly sweetened with panela and nothing else.",
      notes: { nose: "Vanilla pod, cinnamon bark, orange oil", palate: "Cacao, clove, baked plantain", finish: "Long, warming, peppery" },
      serve: "With espresso, with cola and lime, or warm in winter.",
      cocktail: "cafe-especiado", tags: ["spiced", "mixing"]
    },
    {
      id: "solera-12", no: "04", name: "Solera 12", style: "Aged dark rum",
      age: "Solera, up to 12 years", abv: 42, size: "70 cl", price: 58,
      img: "assets/img/bottle-solera.jpg",
      tagline: "Three tiers of oak, twelve years of patience.",
      desc: "The heart of the house. Rums of up to twelve years move down through three tiers of bourbon and oloroso sherry casks, each bottling drawn from the oldest row and topped up from the one above.",
      notes: { nose: "Dried fig, toffee, cigar box", palate: "Dark chocolate, raisin, roasted walnut", finish: "Silky, long, a trace of sherry" },
      serve: "Neat in a tulip glass, or stirred into an Old Fashioned.",
      cocktail: "old-fashioned", tags: ["dark", "sipping"], featured: true
    },
    {
      id: "gran-reserva-23", no: "05", name: "Gran Reserva 23", style: "Limited reserve",
      age: "Solera, up to 23 years", abv: 43, size: "70 cl", price: 129,
      img: "assets/img/bottle-reserva.jpg",
      tagline: "2,400 numbered bottles a year.",
      desc: "Drawn once a year from the lowest row of the oldest solera in the cellar and finished for eighteen months in Pedro Ximénez casks. Bottled unfiltered, numbered by hand.",
      notes: { nose: "Prune, old leather, burnt orange", palate: "Molasses, espresso, candied pecan", finish: "Very long, dry oak and cocoa" },
      serve: "Neat, at room temperature, with time.",
      cocktail: "old-fashioned", tags: ["dark", "sipping", "limited"], limited: true
    }
  ],

  cocktails: [
    {
      id: "old-fashioned", name: "Tresalba Old Fashioned", rum: "solera-12", img: "assets/img/cocktail-oldfashioned.jpg",
      glass: "Rocks", time: "3 min", blurb: "The slowest way to drink our oldest rums.",
      ingredients: ["60 ml Solera 12", "5 ml demerara syrup (2:1)", "2 dashes aromatic bitters", "1 dash orange bitters", "Orange peel"],
      method: "Stir everything over ice for 30 seconds. Strain onto one large cube and express the orange peel across the surface."
    },
    {
      id: "daiquiri", name: "Daiquiri Clásico", rum: "blanco-seco", img: "assets/img/cocktail-daiquiri.jpg",
      glass: "Coupe", time: "2 min", blurb: "Three ingredients, nowhere to hide.",
      ingredients: ["60 ml Blanco Seco", "25 ml fresh lime juice", "15 ml sugar syrup (2:1)"],
      method: "Shake hard with plenty of ice until the tin frosts. Fine-strain into a chilled coupe. No garnish needed."
    },
    {
      id: "mojito", name: "Mojito de la Casa", rum: "dorado-5", img: "assets/img/cocktail-mojito.jpg",
      glass: "Highball", time: "4 min", blurb: "Gold rum gives the classic a rounder middle.",
      ingredients: ["50 ml Dorado 5", "25 ml fresh lime juice", "2 tsp white sugar", "10 mint leaves", "Soda water"],
      method: "Press the mint gently with sugar and lime in the glass. Add rum and crushed ice, churn, top with soda and crown with a mint sprig."
    },
    {
      id: "cafe-especiado", name: "Café Especiado", rum: "especiado", img: "assets/img/cocktail-cafe.jpg",
      glass: "Nick & Nora", time: "4 min", blurb: "Spice and espresso, after dinner.",
      ingredients: ["45 ml Especiado", "30 ml fresh espresso", "15 ml coffee liqueur", "10 ml demerara syrup"],
      method: "Shake very hard with ice to build the foam. Fine-strain into a chilled glass and float three coffee beans."
    }
  ],

  craft: [
    { no: "01", title: "Cane", img: "assets/img/cane.jpg",
      body: "Rum begins as sugarcane, a giant grass harvested after twelve to eighteen months. Most rum, ours included, is made from molasses, the dark syrup left when sugar is crystallised out of the juice. A smaller family, rhum agricole, ferments the fresh juice itself.",
      fact: "Molasses", factLabel: "Our raw material" },
    { no: "02", title: "Fermentation", img: "assets/img/fermentation.jpg",
      body: "Molasses is diluted with water and yeast is added. Over one to several days the yeast turns sugar into alcohol and into esters, the aromatic compounds behind rum's fruit. Short ferments give light, clean rum. Long ones, sometimes two weeks, give heavy, funky rum.",
      fact: "72 hours", factLabel: "Our ferment" },
    { no: "03", title: "Distillation", img: "assets/img/still.jpg",
      body: "The fermented wash, around 7% alcohol, is concentrated by heat. Pot stills work in batches and carry more flavour across. Column stills run continuously and produce a lighter, purer spirit. Spanish-style rum, the tradition we work in, is mostly column distilled.",
      fact: "Column + pot", factLabel: "Blended at the still" },
    { no: "04", title: "Solera ageing", img: "assets/img/cellar.jpg",
      body: "New rum is clear. Colour and depth come from oak. In a solera, barrels are stacked in tiers by age. Rum for bottling is drawn only from the oldest row, which is never emptied; it is refilled from the row above, and so on up to the youngest. In tropical heat a barrel loses far more to evaporation each year than in a cool climate, so rum matures quickly.",
      fact: "3 tiers", factLabel: "Bourbon and sherry oak" },
    { no: "05", title: "Blending", img: "assets/img/cellar.jpg",
      body: "The maestro ronero tastes and marries casks until the house character is right, then brings the blend down to bottling strength with soft water. Because a solera mixes ages, the number on a solera label marks the oldest rum in the blend rather than the youngest.",
      fact: "40–43%", factLabel: "Bottling strength" }
  ],

  styles: [
    { name: "White", alt: "Blanco · Silver", region: "Cuba, Puerto Rico, Latin America",
      body: "Usually column distilled, rested briefly in oak and charcoal filtered to remove colour. Crisp and light, with the cleanest line to the cane.", best: "Daiquiri, Mojito" },
    { name: "Gold", alt: "Dorado · Amber", region: "Across the Caribbean",
      body: "A few years in oak add honeyed colour, vanilla and soft caramel. The versatile middle of the shelf, equally at home in a glass or a shaker.", best: "Highballs, punches" },
    { name: "Dark & aged", alt: "Añejo · Extra viejo", region: "Barbados, Guatemala, Venezuela, Panama",
      body: "Long ageing builds dried fruit, chocolate, tobacco and spice. The best are made for sipping in the way of a good cognac or whisky.", best: "Neat, Old Fashioned" },
    { name: "Spanish style", alt: "Ron · Solera", region: "Cuba, Dominican Republic, Venezuela, Colombia",
      body: "Molasses based and mostly column distilled, giving a light, smooth, rounded spirit. Often matured in solera systems borrowed from sherry making. This is the tradition Tresalba works in.", best: "Sipping, stirred drinks" },
    { name: "English style", alt: "Rum · Navy · Demerara", region: "Jamaica, Barbados, Guyana",
      body: "Pot stills and long ferments make heavier, more aromatic rum. Jamaica is known for intensely fruity high-ester rum; Guyana for deep, dark Demerara.", best: "Mai Tai, punches" },
    { name: "French style", alt: "Rhum agricole", region: "Martinique, Guadeloupe, Réunion",
      body: "Distilled from fresh cane juice instead of molasses, which gives a grassy, vegetal, vivid spirit. Martinique's agricole carries its own protected appellation.", best: "Ti' Punch" },
    { name: "Spiced", alt: "Especiado", region: "Worldwide",
      body: "Rum infused with spices such as vanilla, cinnamon, clove and citrus peel, often lightly sweetened. Quality depends on the rum underneath and on using whole spices.", best: "With cola, coffee, ginger" },
    { name: "Overproof", alt: "Navy strength · 151", region: "Jamaica, Guyana",
      body: "Bottled well above standard strength, typically from 57% up to about 75% alcohol. Used in small measures for intensity in tiki drinks and floats.", best: "Tiki drinks, floats" }
  ]
};
