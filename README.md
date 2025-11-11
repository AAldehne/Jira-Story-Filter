# JIRA Story Filter

## Überblick
Dieses Projekt ist ein kleines **Chrome-Plugin**, mit dem man im Jira-Board die Stories filtern kann.  
**Alle Unteraufgaben (Sub-Tasks) bleiben erhalten.**

### Optionen

- **Offen** – blendet offene Stories ein (select for Devlopment + In Arbeit)
- **Dev** – blendet nur (select for Devlopment) Stories ein 
- **In Arbeit** – blendet nur (In Arbeit) Stories ein 
- **Fertig** – blendet fertige Stories ein
- **Alle** – keine Filter  

Die letzte Auswahl wird im **LocalStorage** gespeichert und beim nächsten Öffnen übernommen.

---

## Installation (Chrome Extension)

1. Diesen Projektordner lokal **entpacken**.  
2. In Chrome `chrome://extensions` öffnen.  
3. **Entwicklermodus** aktivieren (oben rechts).  
4. **„Entpackte Erweiterung laden“** wählen und den **entpackten Ordner** auswählen.  
5. In der Toolbar auf das Erweiterungs-Icon klicken und einen Modus auswählen.

> Hinweis: Die Extension ist für Jira unter der Domain `https://tickets.optadata.com/` ausgelegt.

--

## Alternative: Bookmarklets

Falls ihr die Extension nicht installieren wollt, könnt ihr alternativ **Bookmarklets** nutzen.

### Einrichtung
1. Ein neues Lesezeichen erstellen.  
2. Als **Name** z. B. „Jira – In Arbeit filtern“.  
3. Als **URL** den entsprechenden `javascript:(...)`-Code einfügen.  
4. Auf dem Jira-Board das Lesezeichen anklicken.

### In Arbeit filtern (DONE ausblenden)
```javascript
javascript:(()=>{document.querySelectorAll("span.jira-issue-status-lozenge.jira-issue-status-lozenge-done").forEach(el=>{const c=el.closest(".ghx-heading, .ghx-issue, [data-testid='software-board.issue-card']");if(c)c.remove();});})();


### Fertig filtern (NEW & IN PROGRESS ausblenden)

javascript:(()=>{document.querySelectorAll("span.jira-issue-status-lozenge.jira-issue-status-lozenge-new, span.jira-issue-status-lozenge.jira-issue-status-lozenge-inprogress").forEach(el=>{const c=el.closest(".ghx-heading, .ghx-issue, [data-testid='software-board.issue-card']");if(c)c.remove();});})();
