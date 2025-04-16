
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Copy, Check, Gift, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { AspectRatio } from './ui/aspect-ratio';

interface GiftRegistryProps {
  className?: string;
  bankAccounts?: BankAccount[];
  digitalWallets?: DigitalWallet[];
  wishlist?: WishlistItem[];
}

interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  logoUrl?: string;
}

interface DigitalWallet {
  walletName: string;
  accountNumber: string;
  accountName: string;
  logoUrl?: string;
}

interface WishlistItem {
  name: string;
  description?: string;
  imageUrl?: string;
  url?: string;
}

const defaultBankAccounts: BankAccount[] = [
  {
    bankName: 'Bank BCA',
    accountNumber: '1234567890',
    accountName: 'Nama Pengantin',
    logoUrl: '/bank-logos/bca.png'
  },
  {
    bankName: 'Bank Mandiri',
    accountNumber: '0987654321',
    accountName: 'Nama Pengantin',
    logoUrl: '/bank-logos/mandiri.png'
  }
];

const defaultDigitalWallets: DigitalWallet[] = [
  {
    walletName: 'DANA',
    accountNumber: '08123456789',
    accountName: 'Nama Pengantin',
    logoUrl: '/wallet-logos/dana.png'
  },
  {
    walletName: 'GoPay',
    accountNumber: '08123456789',
    accountName: 'Nama Pengantin',
    logoUrl: '/wallet-logos/gopay.png'
  }
];

const GiftRegistry: React.FC<GiftRegistryProps> = ({
  className = '',
  bankAccounts = defaultBankAccounts,
  digitalWallets = defaultDigitalWallets,
  wishlist = []
}) => {
  const [copySuccess, setCopySuccess] = useState<Record<string, boolean>>({});
  
  const handleCopyClick = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess({...copySuccess, [id]: true});
    toast.success("Berhasil menyalin nomor rekening", {
      description: text,
    });
    
    setTimeout(() => {
      setCopySuccess({...copySuccess, [id]: false});
    }, 2000);
  };

  return (
    <div className={`py-12 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-4"
      >
        <div className="text-center mb-10">
          <h2 className="font-dancing text-3xl md:text-4xl mb-3 text-wedding-rosegold">
            Hadiah Pernikahan
          </h2>
          <Separator className="w-16 mx-auto mb-4 bg-wedding-rosegold/70" />
          <p className="text-gray-600 max-w-xl mx-auto">
            Kehadiran dan doa Anda adalah hadiah terbaik bagi kami. Namun, jika berkenan memberikan hadiah, Anda dapat mengirimkannya melalui rekening atau e-wallet berikut.
          </p>
        </div>

        <Tabs defaultValue="bank" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <Gift size={16} />
              <span>Rekening Bank</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center gap-2">
              <Wallet size={16} />
              <span>E-Wallet</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bank" className="mt-6">
            <div className="grid gap-4">
              {bankAccounts.map((account, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{account.bankName}</CardTitle>
                      {account.logoUrl && (
                        <div className="w-12 h-8">
                          <AspectRatio ratio={3/2}>
                            <img
                              src={account.logoUrl}
                              alt={account.bankName}
                              className="object-contain w-full h-full"
                            />
                          </AspectRatio>
                        </div>
                      )}
                    </div>
                    <CardDescription>{account.accountName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor={`account-${index}`}>Nomor Rekening</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={`account-${index}`}
                          value={account.accountNumber}
                          readOnly
                          className="font-medium"
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="shrink-0"
                          onClick={() => handleCopyClick(account.accountNumber, `bank-${index}`)}
                        >
                          {copySuccess[`bank-${index}`] ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="wallet" className="mt-6">
            <div className="grid gap-4">
              {digitalWallets.map((wallet, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{wallet.walletName}</CardTitle>
                      {wallet.logoUrl && (
                        <div className="w-12 h-8">
                          <AspectRatio ratio={3/2}>
                            <img
                              src={wallet.logoUrl}
                              alt={wallet.walletName}
                              className="object-contain w-full h-full"
                            />
                          </AspectRatio>
                        </div>
                      )}
                    </div>
                    <CardDescription>{wallet.accountName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor={`wallet-${index}`}>Nomor {wallet.walletName}</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={`wallet-${index}`}
                          value={wallet.accountNumber}
                          readOnly
                          className="font-medium"
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="shrink-0"
                          onClick={() => handleCopyClick(wallet.accountNumber, `wallet-${index}`)}
                        >
                          {copySuccess[`wallet-${index}`] ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {wishlist && wishlist.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-center">Wishlist Kami</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishlist.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  {item.imageUrl && (
                    <div className="relative h-48">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    {item.description && (
                      <CardDescription>{item.description}</CardDescription>
                    )}
                  </CardHeader>
                  {item.url && (
                    <CardFooter>
                      <Button asChild className="w-full bg-wedding-rosegold hover:bg-wedding-deep-rosegold">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          Lihat Detail
                        </a>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GiftRegistry;
