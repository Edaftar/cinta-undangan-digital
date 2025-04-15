
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');
  const { user } = useAuth();

  // Load theme preference from profile when user logs in
  useEffect(() => {
    const loadThemePreference = async () => {
      if (!user) {
        // Use system preference or default to light when no user
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('dark_mode')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching theme preference:', error);
          return;
        }

        // If dark_mode exists and is true, set theme to dark
        if (data && data.dark_mode) {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };

    loadThemePreference();
  }, [user]);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle theme and save to profile if logged in
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (user) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            dark_mode: newTheme === 'dark',
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (error) {
          console.error('Error saving theme preference:', error);
        }
      } catch (error) {
        console.error('Error updating theme preference:', error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
