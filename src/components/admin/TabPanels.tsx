
import { ReactNode } from "react";
import { TabsContent } from "@/components/ui/tabs";

interface SubscriptionsTabProps {}

const SubscriptionsTab = ({}: SubscriptionsTabProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Gestion des abonnements</h2>
      <p className="text-muted-foreground">
        Cette fonctionnalité sera disponible prochainement.
      </p>
    </div>
  );
};

interface SettingsTabProps {}

const SettingsTab = ({}: SettingsTabProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Paramètres système</h2>
      <p className="text-muted-foreground">
        Cette fonctionnalité sera disponible prochainement.
      </p>
    </div>
  );
};

interface TabPanelsProps {
  activeTab: string;
  children: ReactNode;
}

const TabPanels = ({ activeTab, children }: TabPanelsProps) => {
  return (
    <>
      <TabsContent value="users" className="mt-0">
        {children}
      </TabsContent>

      <TabsContent value="subscriptions" className="mt-0">
        <SubscriptionsTab />
      </TabsContent>

      <TabsContent value="settings" className="mt-0">
        <SettingsTab />
      </TabsContent>
    </>
  );
};

export default TabPanels;
