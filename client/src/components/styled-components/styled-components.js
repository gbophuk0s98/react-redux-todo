import styled from 'styled-components'

export const HeaderWrapper = styled.nav`
    background: ${({ theme }) => theme.navBackground };
`

export const TableWrapper = styled.table`
    background: ${({ theme }) => theme.tableBackground};
    color: ${({ theme }) => theme.text};
    border-radius: 5px;
    & thead {
        border-bottom: 1px solid #444;
    }
    & thead th {
        border-top: none;
        border-bottom: none;
    }
    & tr:not(:first-child) {
        border-top: 1px solid #444;
    }
    $ td {
        border-top: none;
    }
`

export const Button = styled.div`
    background: ${({ theme }) => theme.btnBackground};
    border: none;
    &:hover {
        transition: background-color .15s ease-in-out;
        opacity: 0.7;
    }
`

export const DropDownMenuWrapper = styled.div`
    position: absolute;
    z-index: 50;
    top: 38px;
    width: 200px;
    background: ${({ theme }) => theme.btnBackground};
    overflow: hidden;
    border-radius: 5px;
`

export const DropDownProjectList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 3px solid ${({ theme }) => theme.dropDownBorderBottom};
`

export const TodoDetailWrapper = styled.div`
    position: absolute;
    right: -250px;
    z-index: 99;
    width: 35%;
    height: 100%;
    overflow: auto;
    background: #515151;
    padding: 1.5rem;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
    font-size: 17px;
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.navBackground};
`

export const ProjectPageContainer = styled.div`
    max-width: 320px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.text};
`

export const CardWrapper = styled.div`
    background-color: ${({ theme }) => theme.cardBackground};
`

export default {
    HeaderWrapper,
    Button,
    TableWrapper,
    TodoDetailWrapper,
    DropDownMenuWrapper,
    DropDownProjectList,
    ProjectPageContainer,
    CardWrapper
}