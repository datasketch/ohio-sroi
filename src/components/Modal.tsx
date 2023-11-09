import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

export default function Modal({ color, amount, title, description }) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className='text-sm' style={{ color }}>
                    See more
                </button>
            </Dialog.Trigger>
            <Dialog.Portal className='relative'>
                <Dialog.Overlay className='DialogOverlay' />
                <Dialog.Content className='DialogContent' style={{ boxShadow: '0px 0px 4px 0px #00000040' }}>
                    <div>
                        <div className='text-center'>
                            <h3>
                                {title}
                            </h3>
                            <p className='mt-2 font-semibold text-2xl lg:text-3xl' style={{ color }}>
                                ${amount}
                            </p>
                        </div>
                        <Dialog.Description className='mt-4'>
                            <p className='pt-3 border-t-[0.5px] border-t-silver text-sm text-gray-2'>
                                {description}
                            </p>
                        </Dialog.Description>
                        <Dialog.Close asChild>
                            <button className='absolute -top-3 -right-3 w-7 h-7 bg-dim-gray rounded-full grid place-items-center'>
                                <Cross1Icon color='#fff' />
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}