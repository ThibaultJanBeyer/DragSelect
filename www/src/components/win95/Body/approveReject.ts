import { BubbleExplosion } from 'beautiful-web-animations'

export type ApproveRejectProps = {
  items: HTMLElement[]
  content: string
}

export const handleApproveReject = async ({
  items,
  content,
}: ApproveRejectProps) => {
  const BEs = items.map((item: HTMLElement) =>
    BubbleExplosion({
      element: item,
      content,
      particles: {
        size: 25,
      },
    })
  )
  await Promise.all(BEs.map((BE) => BE.trigger()))
  BEs.forEach((BE) => BE.destroy())
}
