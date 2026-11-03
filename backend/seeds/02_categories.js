exports.seed = async function(knex){
  await knex('categorie').insert([
    {nom:'tajwid', slug: 'tajwid', description: 'Les règles de récitation du Coran.'},
    {nom:'memorisation', slug: 'memorisation', description: 'Apprendre le Coran par cœur'},
    { nom: 'Langue arabe', slug: 'langue-arabe', description: 'Comprendre la langue du Coran.' },
  ]).onConflict('slug').ignore();
}