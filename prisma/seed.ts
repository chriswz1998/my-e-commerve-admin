const { PrismaClient } = require('@prisma/client')
// @ts-ignore
const prisma = new PrismaClient()

async function main() {
  const nav1Id = 'a42a7b68-3045-4caa-8a3a-c2cb48f14ce4' // 替换为实际的 Nav1 ID

  // 创建 Nav2: 加拿大技术类移民 及其 Nav3 项目
  const nav2ForSkilledImmigration = await prisma.nav2.create({
    data: {
      name_ch: '移民热门项目',
      name_en: 'Hot Project',
      description_ch: '',
      description_en: '',
      nav1Id: nav1Id, // 关联到 Nav1 的 ID
      nav_3: {
        create: [
          { name_ch: '阿省雇主担保', name_en: '', link: '', disable: false },
          { name_ch: '曼省雇主担保', name_en: '', link: '', disable: false },
          { name_ch: '萨省雇主担保', name_en: '', link: '', disable: false },
          {
            name_ch: 'AIPP海洋省雇主担保',
            name_en: '',
            link: '',
            disable: false
          },
          { name_ch: 'BC省雇主担保', name_en: '', link: '', disable: false }
        ]
      }
    }
  })

  console.log('Nav2 and Nav3 created successfully with nav1Id:', nav1Id)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
