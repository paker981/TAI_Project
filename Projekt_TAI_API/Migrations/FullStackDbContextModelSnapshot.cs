﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Projekt_TAI_API.Data;

#nullable disable

namespace ProjektTAIAPI.Migrations
{
    [DbContext(typeof(FullStackDbContext))]
    partial class FullStackDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Projekt_TAI_API.Models.car", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("id"));

                    b.Property<string>("category")
                        .HasColumnType("text");

                    b.Property<string>("description")
                        .HasColumnType("text");

                    b.Property<string>("imgage")
                        .HasColumnType("text");

                    b.Property<long>("price")
                        .HasColumnType("bigint");

                    b.Property<string>("title")
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("Projekt_TAI_API.Models.order", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("date")
                        .HasColumnType("text");

                    b.Property<string>("email")
                        .HasColumnType("text");

                    b.Property<string>("paid")
                        .HasColumnType("text");

                    b.Property<long>("price")
                        .HasColumnType("bigint");

                    b.Property<int>("quantity")
                        .HasColumnType("integer");

                    b.Property<string>("status")
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Projekt_TAI_API.Models.pracownik", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("email")
                        .HasColumnType("text");

                    b.Property<string>("firma")
                        .HasColumnType("text");

                    b.Property<string>("haslo")
                        .HasColumnType("text");

                    b.Property<string>("imie")
                        .HasColumnType("text");

                    b.Property<long>("numer")
                        .HasColumnType("bigint");

                    b.Property<string>("plec")
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("Pracownicy");
                });

            modelBuilder.Entity("Projekt_TAI_API.Models.uzytkownik", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("email")
                        .HasColumnType("text");

                    b.Property<string>("firma")
                        .HasColumnType("text");

                    b.Property<string>("haslo")
                        .HasColumnType("text");

                    b.Property<string>("imie")
                        .HasColumnType("text");

                    b.Property<long>("numer")
                        .HasColumnType("bigint");

                    b.Property<string>("plec")
                        .HasColumnType("text");

                    b.Property<string>("refreshToken")
                        .HasColumnType("text");

                    b.Property<DateTime>("refreshTokenExpiryTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("resetPasswordExpiry")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("resetPasswordToken")
                        .HasColumnType("text");

                    b.Property<string>("role")
                        .HasColumnType("text");

                    b.Property<string>("token")
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("Uzytkownicy");
                });
#pragma warning restore 612, 618
        }
    }
}
