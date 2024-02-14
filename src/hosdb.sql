USE [master]
GO
/****** Object:  Database [hospital]    Script Date: 2/14/2024 4:43:51 PM ******/
CREATE DATABASE [hospital]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'hospital', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\hospital.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'hospital_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\hospital_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [hospital] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [hospital].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [hospital] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [hospital] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [hospital] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [hospital] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [hospital] SET ARITHABORT OFF 
GO
ALTER DATABASE [hospital] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [hospital] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [hospital] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [hospital] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [hospital] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [hospital] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [hospital] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [hospital] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [hospital] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [hospital] SET  DISABLE_BROKER 
GO
ALTER DATABASE [hospital] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [hospital] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [hospital] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [hospital] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [hospital] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [hospital] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [hospital] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [hospital] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [hospital] SET  MULTI_USER 
GO
ALTER DATABASE [hospital] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [hospital] SET DB_CHAINING OFF 
GO
ALTER DATABASE [hospital] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [hospital] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [hospital] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [hospital] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [hospital] SET QUERY_STORE = ON
GO
ALTER DATABASE [hospital] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [hospital]
GO
/****** Object:  Table [dbo].[consultation]    Script Date: 2/14/2024 4:43:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[consultation](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[doctor_assigned] [nvarchar](100) NULL,
	[consultation] [nvarchar](100) NULL,
	[status] [nvarchar](100) NULL,
	[date] [datetime] NULL,
	[patient_name] [nvarchar](100) NULL,
	[patient_id] [int] NULL,
	[temperature] [nvarchar](50) NULL,
	[weight] [nvarchar](50) NULL,
	[heart_rate] [nvarchar](50) NULL,
	[pulse] [nvarchar](50) NULL,
 CONSTRAINT [PK_consultation_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 2/14/2024 4:43:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](225) NULL,
	[type] [nvarchar](50) NOT NULL,
	[contact] [nvarchar](50) NULL,
	[email] [nvarchar](255) NULL,
	[username] [nvarchar](100) NULL,
	[password] [nvarchar](100) NULL,
	[dateOf] [date] NULL,
 CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[patient]    Script Date: 2/14/2024 4:43:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[patient](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[email] [nvarchar](100) NULL,
	[contact] [nvarchar](100) NULL,
	[sex] [nvarchar](100) NULL,
	[dob] [nvarchar](100) NULL,
	[address] [nvarchar](225) NULL,
	[marital_status] [nvarchar](100) NULL,
	[next_of_kin] [nvarchar](100) NULL,
	[date] [datetime] NULL,
	[nID] [nvarchar](100) NULL,
 CONSTRAINT [PK_patient] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[types]    Script Date: 2/14/2024 4:43:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[types](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NULL,
 CONSTRAINT [PK_types] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[consultation] ADD  CONSTRAINT [DF_consultation_status]  DEFAULT ('Pending') FOR [status]
GO
ALTER TABLE [dbo].[consultation] ADD  CONSTRAINT [DF_consultation_date]  DEFAULT (getdate()) FOR [date]
GO
ALTER TABLE [dbo].[Employees] ADD  CONSTRAINT [DF_Employees_dateOf]  DEFAULT (getdate()) FOR [dateOf]
GO
ALTER TABLE [dbo].[patient] ADD  CONSTRAINT [DF_patient_date]  DEFAULT (getdate()) FOR [date]
GO
ALTER TABLE [dbo].[consultation]  WITH CHECK ADD  CONSTRAINT [FK_consultation_patient] FOREIGN KEY([patient_id])
REFERENCES [dbo].[patient] ([id])
GO
ALTER TABLE [dbo].[consultation] CHECK CONSTRAINT [FK_consultation_patient]
GO
USE [master]
GO
ALTER DATABASE [hospital] SET  READ_WRITE 
GO
