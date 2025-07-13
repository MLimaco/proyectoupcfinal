"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface TabsNavigationProps {
  tabs: Tab[];
  startupId?: string;
  defaultValue?: string;
  onTabChange?: (tab: string) => void;
}

export default function TabsNavigation({
  tabs,
  startupId,
  defaultValue,
  onTabChange,
}: TabsNavigationProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.id || "");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [listWidth, setListWidth] = useState(0);
  
  useEffect(() => {
    // Medir si los tabs necesitan controles de desplazamiento
    const container = document.querySelector("#tabs-container");
    const list = document.querySelector("#tabs-list");
    
    if (container && list) {
      setContainerWidth(container.clientWidth);
      setListWidth(list.scrollWidth);
      setShowControls(list.scrollWidth > container.clientWidth);
      
      // Observer para detectar cambios de tamaño
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.target === container) {
            setContainerWidth(entry.contentRect.width);
            setShowControls(list.scrollWidth > entry.contentRect.width);
          }
        }
      });
      
      resizeObserver.observe(container);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [tabs]);
  
const handleTabChange = (tab: string) => {
  setActiveTab(tab);
  if (onTabChange) {
    // Asegúrate de que esto se llame con el valor correcto
    console.log("Tab changed to:", tab); // Para depuración
    onTabChange(tab);
  }
};
  
  const scrollLeft = () => {
    const container = document.querySelector("#tabs-container");
    if (container) {
      const newPosition = Math.max(0, scrollPosition - 200);
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };
  
  const scrollRight = () => {
    const container = document.querySelector("#tabs-container");
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + 200);
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="relative flex items-center">
      {showControls && scrollPosition > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 z-10 h-7 w-7 rounded-full bg-background shadow-sm"
          onClick={scrollLeft}
        >
          <ChevronLeft size={16} />
        </Button>
      )}
      
      <ScrollArea 
        id="tabs-container"
        className="w-full max-w-full"
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        scrollHideDelay={0}
      >
        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList id="tabs-list" className="flex h-9 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "flex-shrink-0 px-4 data-[state=active]:bg-muted",
                  "whitespace-nowrap text-sm"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </ScrollArea>
      
      {showControls && scrollPosition < listWidth - containerWidth && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 z-10 h-7 w-7 rounded-full bg-background shadow-sm"
          onClick={scrollRight}
        >
          <ChevronRight size={16} />
        </Button>
      )}
    </div>
  );
}