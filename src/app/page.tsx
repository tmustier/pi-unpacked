import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AgentLoop from "@/components/AgentLoop";
import ArchitectureExplorer from "@/components/ArchitectureExplorer";
import ToolSystem from "@/components/ToolSystem";
import CommandCatalog from "@/components/CommandCatalog";
import ExtensionGallery from "@/components/ExtensionGallery";
import ProviderSystem from "@/components/ProviderSystem";
import Keybindings from "@/components/Keybindings";
import ExtensionAPI from "@/components/ExtensionAPI";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-32 pb-32">
          <section id="agent-loop">
            <AgentLoop />
          </section>

          <section id="architecture">
            <ArchitectureExplorer />
          </section>

          <section id="tools">
            <ToolSystem />
          </section>

          <section id="commands">
            <CommandCatalog />
          </section>

          <section id="extensions">
            <ExtensionGallery />
          </section>

          <section id="providers">
            <ProviderSystem />
          </section>

          <section id="keybindings">
            <Keybindings />
          </section>

          <section id="extension-api">
            <ExtensionAPI />
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
