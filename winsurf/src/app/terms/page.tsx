export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Conditions d’utilisation</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Ce document décrit les conditions d’utilisation du service Winsurf. Cette page est fournie à titre informatif pour la démo.
        </p>
        <div className="prose prose-invert mt-6 max-w-none text-sm">
          <h2>1. Objet</h2>
          <p>Winsurf met en relation des consommateurs et des commerçants locaux pour faciliter la vente en ligne.</p>
          <h2>2. Comptes</h2>
          <p>Vous êtes responsable de la confidentialité de vos identifiants et de l’exactitude des informations fournies.</p>
          <h2>3. Paiements</h2>
          <p>Les paiements sont opérés par des prestataires tiers (ex. Stripe). Des frais peuvent s’appliquer.</p>
          <h2>4. Données</h2>
          <p>Vos données sont traitées conformément à la Politique de confidentialité.</p>
          <h2>5. Responsabilité</h2>
          <p>Le service est fourni "en l’état" sans garantie. Winsurf ne saurait être tenu responsable d’un usage inapproprié.</p>
        </div>
      </section>
    </main>
  );
}
