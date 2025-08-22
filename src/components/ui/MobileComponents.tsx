import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

// Bottom Sheet para móvil
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: 'auto' | 'half' | 'full';
  title?: string;
  showHandle?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  height = 'auto',
  title,
  showHandle = true
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diff = startY - currentY;
    if (diff > 100) {
      onClose();
    }
    
    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  const getHeightClass = () => {
    switch (height) {
      case 'half':
        return 'h-1/2';
      case 'full':
        return 'h-full';
      default:
        return 'max-h-[80vh]';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50',
              getHeightClass(),
              'overflow-hidden'
            )}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Handle */}
            {showHandle && (
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>
            )}
            
            {/* Header */}
            {title && (
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Cards optimizadas para móvil
interface ServiceMobileCardProps {
  service: any;
  onSelect: () => void;
  variant: 'compact' | 'detailed' | 'featured';
}

export const ServiceMobileCard: React.FC<ServiceMobileCardProps> = ({
  service,
  onSelect,
  variant
}) => {
  if (variant === 'compact') {
    return (
      <div 
        onClick={onSelect}
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-95 transition-transform"
      >
        <div className="flex items-center space-x-3">
          {service.imageUrl && (
            <img 
              src={service.imageUrl} 
              alt={service.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{service.name}</h3>
            <p className="text-sm text-gray-500 truncate">{service.shortDescription}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-bold text-blue-600">
                ${service.price}
              </span>
              <span className="text-sm text-gray-400">
                {service.duration} min
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div 
        onClick={onSelect}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 shadow-sm border border-blue-100 active:scale-95 transition-transform"
      >
        {service.imageUrl && (
          <img 
            src={service.imageUrl} 
            alt={service.name}
            className="w-full h-32 rounded-xl object-cover mb-3"
          />
        )}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              Popular
            </span>
            <span className="text-sm text-gray-500">{service.duration} min</span>
          </div>
          <h3 className="font-bold text-gray-900">{service.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">
              ${service.price}
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600">{service.rating}</span>
              <span className="text-xs text-gray-400">({service.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Detailed variant
  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-95 transition-transform"
    >
      <div className="space-y-3">
        {service.imageUrl && (
          <img 
            src={service.imageUrl} 
            alt={service.name}
            className="w-full h-40 rounded-xl object-cover"
          />
        )}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span 
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: `${service.category.color}20`,
                color: service.category.color 
              }}
            >
              {service.category.name}
            </span>
            <span className="text-sm text-gray-500">{service.duration} min</span>
          </div>
          <h3 className="font-bold text-lg text-gray-900">{service.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>
          
          {service.features && service.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {service.features.slice(0, 3).map((feature: string, index: number) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-blue-600">
              ${service.price}
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600">{service.rating}</span>
              <span className="text-xs text-gray-400">({service.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Swiper para galería
interface ImageGalleryProps {
  images: any[];
  initialSlide?: number;
  onImageClick?: (index: number) => void;
  showThumbnails?: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  initialSlide = 0,
  onImageClick,
  showThumbnails = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={images[currentIndex]?.url || images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          onClick={() => onImageClick?.(currentIndex)}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronUpIcon className="w-4 h-4 rotate-90" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronUpIcon className="w-4 h-4 -rotate-90" />
            </button>
          </>
        )}
        
        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                currentIndex === index 
                  ? "border-blue-500" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <img
                src={image.url || image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Floating Action Button
interface FABProps {
  icon: React.ReactNode;
  label?: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}

export const FAB: React.FC<FABProps> = ({
  icon,
  label,
  onClick,
  variant,
  position = 'bottom-right'
}) => {
  const getPositionClass = () => {
    switch (position) {
      case 'bottom-left':
        return 'left-4';
      case 'bottom-center':
        return 'left-1/2 -translate-x-1/2';
      default:
        return 'right-4';
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25';
      case 'secondary':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-lg shadow-gray-600/25';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-20 z-30 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95',
        getPositionClass(),
        getVariantClass()
      )}
    >
      {icon}
      {label && (
        <span className="sr-only">{label}</span>
      )}
    </button>
  );
};

// Tab Navigation
interface TabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant: 'scrollable' | 'fixed';
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant
}) => {
  return (
    <div className={cn(
      'border-b border-gray-200 bg-white',
      variant === 'fixed' ? 'w-full' : 'min-w-full'
    )}>
      <div className={cn(
        'flex',
        variant === 'scrollable' ? 'overflow-x-auto scrollbar-hide' : 'justify-between'
      )}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors relative flex-shrink-0',
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              )}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tab.label}</span>
              {tab.badge && tab.badge > 0 && (
                <span className="ml-1 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Utility component for line clamping
export const LineClamp: React.FC<{
  children: React.ReactNode;
  lines: number;
  className?: string;
}> = ({ children, lines, className }) => {
  return (
    <div 
      className={cn(
        'overflow-hidden',
        className
      )}
      style={{
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical' as any,
      }}
    >
      {children}
    </div>
  );
};
