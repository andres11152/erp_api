
-- Crear extensión uuid-ossp si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla de usuarios
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    departament VARCHAR(100),
    rol INTEGER,
    permissions INTEGER[],
    user_status INTEGER,
    user_password VARCHAR(255)
);

-- Crear tabla de empleados
CREATE TABLE employees (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type_document INTEGER NOT NULL,
    document VARCHAR(20) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    admission_date DATE NOT NULL,
    retirement_date DATE,
    retirement_reason INTEGER,
    retirement_reason_description VARCHAR(1000),
    personal_phone VARCHAR(20),
    personal_email VARCHAR(100) UNIQUE NOT NULL,
    corporate_phone VARCHAR(20),
    corporate_email VARCHAR(100) UNIQUE NOT NULL,
    birth_date DATE NOT NULL,
    is_student INTEGER NOT NULL CHECK (is_student IN (1, 0)),
    is_retired INTEGER NOT NULL CHECK (is_retired IN (1, 0)),
    medical_test DATE[],
    have_phone INTEGER CHECK (have_phone IN (1, 0)),
    have_sim INTEGER CHECK (have_sim IN (1, 0)),
    sim_number VARCHAR(20),
    sim_provider VARCHAR(100),
    type_contract INTEGER NOT NULL CHECK (type_contract IN (1, 2, 3)),
    contract_expiration_date DATE
);

-- Crear tabla de afiliación a ARL
CREATE TABLE arl_afiliation (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de afiliación a EPS
CREATE TABLE eps_afiliation (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de afiliación a pensión
CREATE TABLE pension_afiliation (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de afiliación a caja de compensación
CREATE TABLE compesation_afiliation (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de archivo de acta
CREATE TABLE act_file (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de registro de contraloría
CREATE TABLE comptroller_record (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de registro de procuraduría
CREATE TABLE attorney_record (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de certificación laboral
CREATE TABLE laboral_certification (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de certificación de estudiante
CREATE TABLE student_certification (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de certificación personal
CREATE TABLE personal_certification (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de contrato
CREATE TABLE contract (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de tratamiento confidencial
CREATE TABLE confident_tratement (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de currículum personal
CREATE TABLE personal_curriculum (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de currículum corporativo
CREATE TABLE corporate_curriculum (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(25),
    doc_file BYTEA,
    validated_status INTEGER NOT NULL CHECK (validated_status IN (1, 0)),
    employee_id UUID REFERENCES employees(id)
);

-- Crear tabla de contacto de comercial
CREATE TABLE Commercial (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tax_id VARCHAR(25) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    address TEXT,
    main_phone VARCHAR(20)
);

-- Crear tabla de contacto de Commercial_Contact
CREATE TABLE Commercial_Contact (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    commercial_id UUID REFERENCES Commercial(id),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100)
);

-- Crear tabla de clientes
CREATE TABLE Clients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    commercial_id UUID REFERENCES Commercial(id),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100)
);

-- Crear tabla de proveedores
CREATE TABLE Suppliers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    commercial_id UUID REFERENCES Commercial(id),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100)
);
