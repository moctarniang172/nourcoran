const donnees = [
  {
    slug: 'tajwid',
    titre: 'Introduction au Tajwid',
    description: 'Les bases de la récitation correcte.',
    niveau: 'debutant',
    videos: [{ titre: 'Les points de sortie des lettres', video_url: 'https://exemple.com/tajwid-1', duree: 600, ordre: 1 },
             { titre: 'Les caractéristiques des lettres', video_url: 'https://exemple.com/tajwid-2', duree: 540, ordre: 2 },
            ],
  },
  {
    slug: 'tajwid',
    titre: 'Les règles du Noun sakin',
    description: 'Idhhar, idgham, iqlab et ikhfa.',
    niveau: 'intermediaire',

    videos: [{ titre: 'Introduction aux règles', video_url: 'https://exemple.com/noun-1', duree: 480, ordre: 1 },
            ],
  },
  {
    slug: 'memorisation',
    titre: 'Mémoriser Juz Amma',
    description: 'Méthode progressive pour le dernier juz.',
    niveau: 'debutant',
    videos: [{ titre: 'Méthode de mémorisation', video_url: 'https://exemple.com/hifz-1', duree: 720, ordre: 1 },
            ],
  },
];

exports.seed = async function(knex){
  for (const c of donnees){
    const categorie = await knex('categorie').where({slug: c.slug}).first();
    if(!categorie){
      throw new Error('categorie introuvable: ${c.slug}');
    }
    let cours = await knex('cours').where({titre: c.titre}).first();
    if(!cours){
      const [id]= await knex('cours').insert({
        categorie_id: categorie.id,
        titre: c.titre,
        description: c.description,
        niveau: c.niveau,
      });
      cours = { id };
    }
    const lignes = c.videos.map((v)=>({
      ...v, cours_id: cours.id
    }))
    await knex('videos').insert(lignes).onConflict().ignore();
  }
};