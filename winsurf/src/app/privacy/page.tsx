export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Politique de confidentialité</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Cette page explique comment les données sont collectées et utilisées par Winsurf. Version simplifiée pour la démo.
        </p>
        <div className="prose prose-invert mt-6 max-w-none text-sm">
          <h2>Données collectées</h2>
          <p>Profil, coordonnées, commandes, messages, préférences. Optionnellement localisation si vous l’autorisez.</p>
          <h2>Usage</h2>
          <p>Amélioration du service, gestion des commandes, sécurité et support. Pas de revente de données.</p>
          <h2>Conservation</h2>
          <p>Les données sont conservées pendant la durée nécessaire au service et conformes aux obligations légales.</p>
          <h2>Partage</h2>
          <p>Prestataires techniques (paiement, hébergement) dans le strict cadre de l’exécution du service.</p>
          <h2>Vos droits</h2>
          <p>Accès, rectification, suppression et portabilité de vos données. Contactez-nous pour exercer vos droits.</p>
        </div>
      </section>
    </main>
  );
}
