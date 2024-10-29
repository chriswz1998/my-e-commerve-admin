const { PrismaClient } = require('@prisma/client')
const data = require('../seed-for-prisma/production_db.json')
// @ts-ignore
const prisma = new PrismaClient()

async function main() {
  for (const item of data) {
    const res1 = await prisma.content.findFirst({
      where: {
        title_ch: item.header_titles
      }
    })
    const res2 = await prisma.nav3.findFirst({
      where: {
        name_ch: item.subsection_name
      }
    })

    if (res1 && res2) {
      await prisma.nav3.update({
        where: { id: res2.id }, // specify which nav3 record to update
        data: {
          link: res1.id
        }
      })
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
