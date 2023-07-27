import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../Button';
import { twMerge } from 'tailwind-merge';

interface ModalProps extends React.ComponentProps<typeof Dialog.Root> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

let ModalContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

const Modal = ({
  open = false,
  onOpenChange,
  children,
  ...props
}: ModalProps) => {
  let [isOpen, setOpen] = useState(open);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChange?.(open);
  };

  useEffect(() => {
    handleOpenChange(open);
  }, [open]);

  return (
    <ModalContext.Provider value={{ open: isOpen, setOpen }}>
      <Dialog.Root
        modal
        open={isOpen}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {children}
      </Dialog.Root>
    </ModalContext.Provider>
  );
};

function ModalTrigger({ children }: { children: ReactNode }) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
}

Modal.Trigger = ModalTrigger;

function ModalClose({ children }: { children: ReactNode }) {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
}

Modal.Close = ModalClose;

let DropdownMenuContext = createContext({ closeMenu: () => {} });

interface ModalChildrenProps
  extends React.ComponentProps<typeof Dialog.Content> {
  children: ReactNode;
  className?: string;
  overlayClasses?: string;
  CloseButton?: React.FC<{ onClick: () => void }>;
}

function ModalChildren({
  children,
  className,
  overlayClasses,
  CloseButton,
  ...props
}: ModalChildrenProps) {
  let { open, setOpen } = useContext(ModalContext);

  async function closeMenu() {
    setOpen(false);
  }

  return (
    <DropdownMenuContext.Provider value={{ closeMenu }}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className={twMerge(
                  'absolute inset-0 z-40 w-screen bg-black/50 ',
                  overlayClasses
                )}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild {...props}>
              <motion.div
                initial={{
                  opacity: 0,
                  transform: 'translate(-50%, -50%) scale(.75)',
                }}
                animate={{
                  opacity: 1,
                  transform: 'translate(-50%, -50%) scale(1)',
                }}
                exit={{
                  opacity: 0,
                  transform: 'translate(-50%, -50%) scale(.75)',
                }}
                className={twMerge(
                  'bg-white fixed left-1/2 top-1/2 z-50 max-h-[calc(100vh-50px)] min-h-[50px] min-w-[137px] max-w-[calc(100vw-50px)] -translate-x-1/2 -translate-y-1/2 overflow-x-hidden border-4 border-transparent p-1 shadow',
                  className
                )}
              >
                {children}
                <Dialog.Close asChild>
                  {CloseButton ? (
                    <CloseButton aria-label="Close" onClick={closeMenu} />
                  ) : (
                    <Button
                      className="fixed right-0 top-0"
                      size="small"
                      variant="text"
                      aria-label="Close"
                      onClick={closeMenu}
                    >
                      <svg
                        width="24px"
                        height="24px"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="currentColor"
                      >
                        <path
                          d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </Button>
                  )}
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </DropdownMenuContext.Provider>
  );
}

Modal.Content = ModalChildren;

export default Modal;
