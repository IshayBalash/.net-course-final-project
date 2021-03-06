USE [master]
GO
/****** Object:  Database [CarRentalDbV2]    Script Date: 13/09/2018 23:19:00 ******/
CREATE DATABASE [CarRentalDbV2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CarRentalDbV2', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQL_SERVER\MSSQL\DATA\CarRentalDbV2.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'CarRentalDbV2_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQL_SERVER\MSSQL\DATA\CarRentalDbV2_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [CarRentalDbV2] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CarRentalDbV2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CarRentalDbV2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET ARITHABORT OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CarRentalDbV2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CarRentalDbV2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CarRentalDbV2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CarRentalDbV2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [CarRentalDbV2] SET  MULTI_USER 
GO
ALTER DATABASE [CarRentalDbV2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CarRentalDbV2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CarRentalDbV2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CarRentalDbV2] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [CarRentalDbV2] SET DELAYED_DURABILITY = DISABLED 
GO
USE [CarRentalDbV2]
GO
/****** Object:  Table [dbo].[BranchesTable]    Script Date: 13/09/2018 23:19:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BranchesTable](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Adress] [nvarchar](200) NOT NULL,
	[PositionX] [int] NOT NULL,
	[PositionY] [int] NOT NULL,
	[BranceName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_BranchesTable] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CarsTable]    Script Date: 13/09/2018 23:19:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarsTable](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CarType] [int] NOT NULL,
	[CarKilometer] [int] NOT NULL,
	[CarImg] [nvarchar](200) NOT NULL,
	[CarStatus] [bit] NOT NULL,
	[CarlicenseNumber] [nvarchar](100) NOT NULL,
	[CarLocation] [int] NOT NULL,
 CONSTRAINT [PK_CarsTable] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CarsTypesTable]    Script Date: 13/09/2018 23:19:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarsTypesTable](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Manufacturer] [nvarchar](100) NOT NULL,
	[Model] [nvarchar](50) NOT NULL,
	[Year] [int] NOT NULL,
	[IsAutomatic] [bit] NOT NULL,
	[CostPerDay] [int] NOT NULL,
	[FinePrice] [int] NOT NULL,
 CONSTRAINT [PK_CarsTypesTable] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RentTable]    Script Date: 13/09/2018 23:19:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RentTable](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CarID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[ReturnDate] [date] NOT NULL,
 CONSTRAINT [PK_RentTable] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UsersTable]    Script Date: 13/09/2018 23:19:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersTable](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](100) NOT NULL,
	[UserIdNumber] [nvarchar](100) NOT NULL,
	[UserName] [nvarchar](100) NOT NULL,
	[UserPassword] [nvarchar](100) NOT NULL,
	[UserBirthDate] [date] NULL,
	[UserSex] [bit] NOT NULL,
	[UserEmail] [nvarchar](200) NOT NULL,
	[UserAuthorization] [int] NOT NULL,
	[UserImg] [nvarchar](200) NULL,
 CONSTRAINT [PK_UsersTable] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[BranchesTable] ON 

INSERT [dbo].[BranchesTable] ([ID], [Adress], [PositionX], [PositionY], [BranceName]) VALUES (1, N'Komemiut 9', 7686545, 234356, N'Aldan-Rental-Store')
SET IDENTITY_INSERT [dbo].[BranchesTable] OFF
SET IDENTITY_INSERT [dbo].[CarsTable] ON 

INSERT [dbo].[CarsTable] ([ID], [CarType], [CarKilometer], [CarImg], [CarStatus], [CarlicenseNumber], [CarLocation]) VALUES (3, 1, 1000, N'0387658.jpg', 1, N'0387658', 1)
INSERT [dbo].[CarsTable] ([ID], [CarType], [CarKilometer], [CarImg], [CarStatus], [CarlicenseNumber], [CarLocation]) VALUES (5, 1, 1557656, N'065743521.jpg', 1, N'065743521', 1)
INSERT [dbo].[CarsTable] ([ID], [CarType], [CarKilometer], [CarImg], [CarStatus], [CarlicenseNumber], [CarLocation]) VALUES (9, 1004, 2500, N'456736512.jpg', 1, N'456736512', 1)
INSERT [dbo].[CarsTable] ([ID], [CarType], [CarKilometer], [CarImg], [CarStatus], [CarlicenseNumber], [CarLocation]) VALUES (11, 1004, 200000, N'965328454.jpg', 1, N'965328454', 1)
INSERT [dbo].[CarsTable] ([ID], [CarType], [CarKilometer], [CarImg], [CarStatus], [CarlicenseNumber], [CarLocation]) VALUES (12, 1007, 300000, N'87537180.jpg', 1, N'87537180', 1)
INSERT [dbo].[CarsTable] ([ID], [CarType], [CarKilometer], [CarImg], [CarStatus], [CarlicenseNumber], [CarLocation]) VALUES (13, 1006, 90000, N'78653415.jpg', 0, N'78653415', 1)
SET IDENTITY_INSERT [dbo].[CarsTable] OFF
SET IDENTITY_INSERT [dbo].[CarsTypesTable] ON 

INSERT [dbo].[CarsTypesTable] ([ID], [Manufacturer], [Model], [Year], [IsAutomatic], [CostPerDay], [FinePrice]) VALUES (1, N'mitsubishi', N'Outlander
', 2005, 1, 500, 700)
INSERT [dbo].[CarsTypesTable] ([ID], [Manufacturer], [Model], [Year], [IsAutomatic], [CostPerDay], [FinePrice]) VALUES (3, N'Pejo', N'Z9', 2002, 0, 200, 400)
INSERT [dbo].[CarsTypesTable] ([ID], [Manufacturer], [Model], [Year], [IsAutomatic], [CostPerDay], [FinePrice]) VALUES (1004, N'Ford', N'focos', 2002, 0, 400, 500)
INSERT [dbo].[CarsTypesTable] ([ID], [Manufacturer], [Model], [Year], [IsAutomatic], [CostPerDay], [FinePrice]) VALUES (1006, N'Ford', N'vista', 2000, 1, 300, 400)
INSERT [dbo].[CarsTypesTable] ([ID], [Manufacturer], [Model], [Year], [IsAutomatic], [CostPerDay], [FinePrice]) VALUES (1007, N'reno', N'outback', 2009, 1, 700, 900)
SET IDENTITY_INSERT [dbo].[CarsTypesTable] OFF
SET IDENTITY_INSERT [dbo].[RentTable] ON 

INSERT [dbo].[RentTable] ([ID], [CarID], [UserID], [StartDate], [EndDate], [ReturnDate]) VALUES (24, 3, 1017, CAST(N'2018-09-02' AS Date), CAST(N'2018-09-10' AS Date), CAST(N'2018-09-10' AS Date))
INSERT [dbo].[RentTable] ([ID], [CarID], [UserID], [StartDate], [EndDate], [ReturnDate]) VALUES (25, 9, 1021, CAST(N'2018-08-16' AS Date), CAST(N'2018-08-20' AS Date), CAST(N'2018-08-20' AS Date))
INSERT [dbo].[RentTable] ([ID], [CarID], [UserID], [StartDate], [EndDate], [ReturnDate]) VALUES (26, 12, 1022, CAST(N'2018-08-17' AS Date), CAST(N'2018-08-21' AS Date), CAST(N'2018-08-21' AS Date))
INSERT [dbo].[RentTable] ([ID], [CarID], [UserID], [StartDate], [EndDate], [ReturnDate]) VALUES (27, 9, 1023, CAST(N'2018-07-20' AS Date), CAST(N'2018-07-25' AS Date), CAST(N'2018-07-25' AS Date))
INSERT [dbo].[RentTable] ([ID], [CarID], [UserID], [StartDate], [EndDate], [ReturnDate]) VALUES (28, 3, 1020, CAST(N'2018-09-16' AS Date), CAST(N'2018-09-30' AS Date), CAST(N'2100-01-01' AS Date))
INSERT [dbo].[RentTable] ([ID], [CarID], [UserID], [StartDate], [EndDate], [ReturnDate]) VALUES (29, 11, 1021, CAST(N'2018-09-18' AS Date), CAST(N'2018-09-21' AS Date), CAST(N'2100-01-01' AS Date))
INSERT [dbo].[RentTable] ([ID], [CarID], [UserID], [StartDate], [EndDate], [ReturnDate]) VALUES (30, 11, 1017, CAST(N'2018-10-14' AS Date), CAST(N'2018-10-24' AS Date), CAST(N'2100-01-01' AS Date))
INSERT [dbo].[RentTable] ([ID], [CarID], [UserID], [StartDate], [EndDate], [ReturnDate]) VALUES (31, 12, 1023, CAST(N'2018-09-24' AS Date), CAST(N'2018-09-26' AS Date), CAST(N'2100-01-01' AS Date))
INSERT [dbo].[RentTable] ([ID], [CarID], [UserID], [StartDate], [EndDate], [ReturnDate]) VALUES (32, 3, 1021, CAST(N'2018-09-11' AS Date), CAST(N'2018-09-12' AS Date), CAST(N'2018-09-13' AS Date))
INSERT [dbo].[RentTable] ([ID], [CarID], [UserID], [StartDate], [EndDate], [ReturnDate]) VALUES (34, 9, 1022, CAST(N'2018-09-08' AS Date), CAST(N'2018-09-11' AS Date), CAST(N'2018-09-13' AS Date))
SET IDENTITY_INSERT [dbo].[RentTable] OFF
SET IDENTITY_INSERT [dbo].[UsersTable] ON 

INSERT [dbo].[UsersTable] ([ID], [FullName], [UserIdNumber], [UserName], [UserPassword], [UserBirthDate], [UserSex], [UserEmail], [UserAuthorization], [UserImg]) VALUES (1, N'IshayBalash', N'313431835', N'Ishay6411', N'Aec1234u', CAST(N'1995-11-09' AS Date), 1, N'ishay6411@gmail.com', 2, N'Ishay6411.jpg')
INSERT [dbo].[UsersTable] ([ID], [FullName], [UserIdNumber], [UserName], [UserPassword], [UserBirthDate], [UserSex], [UserEmail], [UserAuthorization], [UserImg]) VALUES (1017, N'sivan Zafrani', N'312219702', N'Sivan123', N'Dgrt4316', CAST(N'1994-03-12' AS Date), 0, N'Sivanghyt@gmail.com', 0, N'Sivan123.jpg')
INSERT [dbo].[UsersTable] ([ID], [FullName], [UserIdNumber], [UserName], [UserPassword], [UserBirthDate], [UserSex], [UserEmail], [UserAuthorization], [UserImg]) VALUES (1018, N'Ori Balash', N'304843030', N'Ori6765', N'Adfg5678', CAST(N'1991-11-04' AS Date), 1, N'Ori123@gmail.com', 1, N'Ori6765.jpg')
INSERT [dbo].[UsersTable] ([ID], [FullName], [UserIdNumber], [UserName], [UserPassword], [UserBirthDate], [UserSex], [UserEmail], [UserAuthorization], [UserImg]) VALUES (1019, N'Enbar Balash', N'308236405', N'Pizka123', N'Agh65467', CAST(N'1993-01-20' AS Date), 0, N'Pizka345@gmail.com', 1, N'Pizka123.jpg')
INSERT [dbo].[UsersTable] ([ID], [FullName], [UserIdNumber], [UserName], [UserPassword], [UserBirthDate], [UserSex], [UserEmail], [UserAuthorization], [UserImg]) VALUES (1020, N'Yariv Aviv', N'313431835', N'Yariv8971', N'Yarv456', CAST(N'1995-04-02' AS Date), 1, N'Yariv657@gmail.com', 0, N'Yariv8971.jpg')
INSERT [dbo].[UsersTable] ([ID], [FullName], [UserIdNumber], [UserName], [UserPassword], [UserBirthDate], [UserSex], [UserEmail], [UserAuthorization], [UserImg]) VALUES (1021, N'Oren Pizanty', N'055373062', N'Oreniny654', N'Orey65281', CAST(N'1997-03-14' AS Date), 1, N'Oren@gmail.com', 0, N'Oreniny654.jpg')
INSERT [dbo].[UsersTable] ([ID], [FullName], [UserIdNumber], [UserName], [UserPassword], [UserBirthDate], [UserSex], [UserEmail], [UserAuthorization], [UserImg]) VALUES (1022, N'Maya Nachmani', N'014147466', N'MN123', N'Mjhg7865G', CAST(N'1993-02-08' AS Date), 0, N'Maya45@gmail.com', 0, N'MN123.jpg')
INSERT [dbo].[UsersTable] ([ID], [FullName], [UserIdNumber], [UserName], [UserPassword], [UserBirthDate], [UserSex], [UserEmail], [UserAuthorization], [UserImg]) VALUES (1023, N'Noya Cohen', N'319014007', N'Noya657', N'adf567S', CAST(N'1993-07-11' AS Date), 0, N'Noya3410@gmail.com', 0, N'Noya657.jpg')
SET IDENTITY_INSERT [dbo].[UsersTable] OFF
ALTER TABLE [dbo].[CarsTable]  WITH CHECK ADD  CONSTRAINT [FK_CarsTable_BranchesTable] FOREIGN KEY([CarLocation])
REFERENCES [dbo].[BranchesTable] ([ID])
GO
ALTER TABLE [dbo].[CarsTable] CHECK CONSTRAINT [FK_CarsTable_BranchesTable]
GO
ALTER TABLE [dbo].[CarsTable]  WITH CHECK ADD  CONSTRAINT [FK_CarsTable_CarsTypesTable] FOREIGN KEY([CarType])
REFERENCES [dbo].[CarsTypesTable] ([ID])
GO
ALTER TABLE [dbo].[CarsTable] CHECK CONSTRAINT [FK_CarsTable_CarsTypesTable]
GO
ALTER TABLE [dbo].[RentTable]  WITH CHECK ADD  CONSTRAINT [FK_RentTable_CarsTable] FOREIGN KEY([CarID])
REFERENCES [dbo].[CarsTable] ([ID])
GO
ALTER TABLE [dbo].[RentTable] CHECK CONSTRAINT [FK_RentTable_CarsTable]
GO
ALTER TABLE [dbo].[RentTable]  WITH CHECK ADD  CONSTRAINT [FK_RentTable_UsersTable] FOREIGN KEY([UserID])
REFERENCES [dbo].[UsersTable] ([ID])
GO
ALTER TABLE [dbo].[RentTable] CHECK CONSTRAINT [FK_RentTable_UsersTable]
GO
USE [master]
GO
ALTER DATABASE [CarRentalDbV2] SET  READ_WRITE 
GO
