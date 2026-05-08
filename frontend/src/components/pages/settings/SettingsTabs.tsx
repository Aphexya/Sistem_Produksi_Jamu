export type SettingsTab = 'profile' | 'thresholds' | 'users';

interface SettingsTabsProps {
  activeTab: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

const tabs: Array<{ value: SettingsTab; label: string }> = [
  { value: 'profile', label: 'PROFIL' },
  { value: 'thresholds', label: 'AMBANG SISTEM' },
  { value: 'users', label: 'MANAJEMEN PENGGUNA' },
];

export default function SettingsTabs({ activeTab, onChange }: SettingsTabsProps) {
  return (
    <div className="mb-10 flex w-full gap-8 overflow-x-auto border-b border-outline-variant/15 pb-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`shrink-0 border-b-4 pb-4 text-sm tracking-wide transition-colors ${
              isActive
                ? 'border-primary font-bold text-primary'
                : 'border-transparent font-medium text-on-surface-variant hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
