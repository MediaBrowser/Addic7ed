using System.Collections.Generic;
using MediaBrowser.Common.Configuration;
using MediaBrowser.Model.Providers;

namespace Addic7ed
{
    public static class ConfigurationExtension
    {
        public static Addic7edOptions GetAddic7edConfiguration(this IConfigurationManager manager)
        {
            return manager.GetConfiguration<Addic7edOptions>("addic7ed");
        }
    }

    public class SubtitleConfigurationFactory : IConfigurationFactory
    {
        public IEnumerable<ConfigurationStore> GetConfigurations()
        {
            return new ConfigurationStore[]
            {
                new ConfigurationStore
                {
                    Key = "subtitles",
                    ConfigurationType = typeof (SubtitleOptions)
                }
            };
        }
    }

    public class Addic7edConfigurationFactory : IConfigurationFactory
    {
        public IEnumerable<ConfigurationStore> GetConfigurations()
        {
            return new ConfigurationStore[]
            {
                new ConfigurationStore
                {
                    Key = "addic7ed",
                    ConfigurationType = typeof (Addic7edOptions)
                }
            };
        }
    }

    public class Addic7edOptions
    {
        public string Addic7edUsername { get; set; }
        public string Addic7edPasswordHash { get; set; }
    }
}
