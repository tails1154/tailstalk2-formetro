# TailsTalk 2 for Windows

TailsTalk 2 for Windows packages the TailsTalk 2 web client in an installable
Windows MSIX application. It connects to `tailstalk2.com`. This is an Electron
application packaged for Windows, not a native UWP rewrite.

## Build locally

Use Windows 10 or 11 with the Windows 10 SDK and Node.js 22 installed:

```powershell
npm ci
npm start
npm run make
```

The MSIX package is written beneath `out/make/`. The upstream MSIX maker is
experimental; the Windows GitHub Actions build is the supported package build.

## Install a CI build

The `Windows MSIX` GitHub Actions workflow publishes an MSIX package and its
matching public test certificate as workflow artifacts. These are for sideload
testing. Import the `.cer` into the current user's **Trusted People** store,
then install the `.msix` with PowerShell:

```powershell
Import-Certificate -FilePath .\TailsTalk2-Metro.cer `
  -CertStoreLocation Cert:\CurrentUser\TrustedPeople
Add-AppxPackage -Path .\TailsTalk2-Metro.msix
```

CI creates a temporary signing certificate for each run. Microsoft Store
distribution requires a package identity and signing certificate issued for
the publisher's Store account.

## License and attribution

This project is licensed under AGPL-3.0-or-later. It is based on Stoat for
Desktop, also distributed under AGPL; see `THIRD_PARTY_NOTICES.md` and
`LICENSE` for attribution and license terms. TailsTalk 2 branding and Windows
packaging changes are maintained in this repository.
