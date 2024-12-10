import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Database, Globe, Zap, DollarSign, Mail, AlertTriangle } from 'lucide-react';

interface SettingToggle {
  name: string;
  enabled: boolean;
  description: string;
}

interface SettingSection {
  title: string;
  icon: any;
  description: string;
  settings: SettingToggle[];
}

export default function Settings() {
  const [sections, setSections] = useState<SettingSection[]>([
    {
      title: 'Quota Alerts',
      icon: Bell,
      description: 'Configure quota usage notifications and alerts',
      settings: [
        { 
          name: 'Usage Threshold Alerts',
          enabled: true,
          description: 'Get notified when quotas reach 75%, 90%, and 100%'
        },
        { 
          name: 'Daily Usage Reports',
          enabled: true,
          description: 'Receive daily summaries of quota usage'
        },
        { 
          name: 'Cost Alerts',
          enabled: true,
          description: 'Get notified when spending exceeds defined thresholds'
        },
        { 
          name: 'User Quota Notifications',
          enabled: false,
          description: 'Notify users when they approach their quota limits'
        }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      description: 'Manage security settings and API access',
      settings: [
        { 
          name: 'Two-Factor Authentication',
          enabled: true,
          description: 'Require 2FA for all administrative actions'
        },
        { 
          name: 'API Key Rotation',
          enabled: true,
          description: 'Automatically rotate API keys every 90 days'
        },
        { 
          name: 'IP Whitelist',
          enabled: true,
          description: 'Restrict access to specific IP addresses'
        },
        { 
          name: 'Audit Logging',
          enabled: true,
          description: 'Log all quota modifications and access attempts'
        }
      ]
    },
    {
      title: 'Cost Management',
      icon: DollarSign,
      description: 'Configure cost control and budget settings',
      settings: [
        { 
          name: 'Auto-suspend at Limit',
          enabled: true,
          description: 'Automatically suspend access when quota is exceeded'
        },
        { 
          name: 'Budget Alerts',
          enabled: true,
          description: 'Get notified when approaching budget limits'
        },
        { 
          name: 'Cost Analysis',
          enabled: true,
          description: 'Generate detailed cost analysis reports'
        },
        { 
          name: 'Auto-scaling Quotas',
          enabled: false,
          description: 'Automatically adjust quotas based on usage patterns'
        }
      ]
    },
    {
      title: 'LLM Settings',
      icon: Zap,
      description: 'Configure LLM-specific settings and defaults',
      settings: [
        { 
          name: 'Default Rate Limiting',
          enabled: true,
          description: 'Apply rate limits to all new LLM integrations'
        },
        { 
          name: 'Model Fallbacks',
          enabled: true,
          description: 'Automatically fallback to alternative models when primary is unavailable'
        },
        { 
          name: 'Usage Analytics',
          enabled: true,
          description: 'Track detailed usage patterns per model'
        },
        { 
          name: 'Smart Quota Distribution',
          enabled: false,
          description: 'Automatically optimize quota distribution across models'
        }
      ]
    },
    {
      title: 'Reporting',
      icon: Database,
      description: 'Configure reporting and analytics settings',
      settings: [
        { 
          name: 'Weekly Reports',
          enabled: true,
          description: 'Send weekly usage and cost reports'
        },
        { 
          name: 'Export Data',
          enabled: true,
          description: 'Allow data export in various formats'
        },
        { 
          name: 'Custom Dashboards',
          enabled: false,
          description: 'Enable creation of custom monitoring dashboards'
        },
        { 
          name: 'Automated Reporting',
          enabled: true,
          description: 'Schedule automated report generation'
        }
      ]
    },
    {
      title: 'Integration',
      icon: Globe,
      description: 'Manage external service connections',
      settings: [
        { 
          name: 'Slack Notifications',
          enabled: true,
          description: 'Send alerts and reports to Slack'
        },
        { 
          name: 'Email Integration',
          enabled: true,
          description: 'Send notifications via email'
        },
        { 
          name: 'Webhook Events',
          enabled: true,
          description: 'Send events to configured webhooks'
        },
        { 
          name: 'SSO Integration',
          enabled: false,
          description: 'Enable Single Sign-On for enterprise users'
        }
      ]
    }
  ]);

  const toggleSetting = (sectionIndex: number, settingIndex: number) => {
    setSections(sections.map((section, secIdx) => {
      if (secIdx === sectionIndex) {
        const newSettings = [...section.settings];
        newSettings[settingIndex] = {
          ...newSettings[settingIndex],
          enabled: !newSettings[settingIndex].enabled
        };
        return { ...section, settings: newSettings };
      }
      return section;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure system-wide settings and preferences
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, sectionIndex) => (
          <div key={section.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <section.icon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {section.settings.map((setting, settingIndex) => (
                <div key={setting.name} className="flex items-center justify-between">
                  <div className="pr-4">
                    <div className="text-sm font-medium text-gray-900">{setting.name}</div>
                    <div className="text-xs text-gray-500">{setting.description}</div>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      setting.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    onClick={() => toggleSetting(sectionIndex, settingIndex)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
