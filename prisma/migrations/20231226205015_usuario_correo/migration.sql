/*
  Warnings:

  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `correo` VARCHAR(191) NOT NULL;
